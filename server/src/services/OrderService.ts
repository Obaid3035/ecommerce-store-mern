import {Service} from "typedi";
import Order, {ORDER_STATUS} from "../model/order";
import Gift from "../model/gift";
import BadRequest, {NotFound} from "../utils/errorCode";
import Coupon from "../model/coupon";
import Tax from "../model/tax";
import {IUser} from "../interface";
import Product from "../model/product";
import Stripe from "stripe";
import {formatAMPM, makeRandomId} from "../utils/helper";
import Shipping from "../model/shipping";
import ShippingCost from "../model/shippingCost";
import {sendAdminPlaceOrderMail, sendPlaceOrderMail} from "../utils/emailService/email";
// @ts-ignore
const stripe = Stripe(process.env.STRIPE_API_KEY)

@Service()
class OrderService {

    async createPaymentIntent(userInput: any) {

        const {client_secret, id} = await stripe.paymentIntents.create({
            amount: parseFloat(userInput.totalAmount) * 100,
            currency: 'usd',
            receipt_email: userInput.email,
            payment_method_types: ['card'],
        })

        return {
            secret: client_secret,
            paymentIntentId: id
        }
    }


    async getCostDetails(taxId: string) {
        const taxPromise = Tax.findById(taxId);
        const shippingCostPromise = ShippingCost.findOne();
        const [tax, shippingCost] = await Promise.all([taxPromise, shippingCostPromise])
        return {
            tax: tax.tax,
            shippingCost: shippingCost.price,
            freeLimit: shippingCost.freeLimit,
        }
    }
    async toDisputed(orderId: string, userInput: any) {
        await Order.findByIdAndUpdate(orderId, {
            status: ORDER_STATUS.DISPUTED,
            disputeMessage: userInput.message
        });

        return {
            message: "Order updated successfully!"
        }
    }

    async index(skip: number, limit: number, currUser: IUser) {
        const orderPromise = Order.find({
            user: currUser._id
        })
            .skip(skip)
            .limit(limit).select("totalAmount createdAt skuId status");
        const orderCountPromise = Order.count({
            user: currUser._id
        });

        const [order, orderCount] = await Promise.all([
            orderPromise,
            orderCountPromise,
        ]);
        const formattedAttributes = order.map((order: any) => {
            let obj = {
                _id: order._id,
                skuId: order.skuId,
                price: order.totalAmount,
                status: order.status,
                createdAt: formatAMPM(order.createdAt)
            }
            return Object.values(obj);
        });

        return {
            data: formattedAttributes,
            count: orderCount,
        };
    }


    async getGiftByCode(code: string) {
        const gift: any = await Gift.findOne({
            codes: {
                $elemMatch: {
                    code,
                    redeemed: false
                }
            }
        })
        if (!gift) {
            throw new BadRequest("E-Gift Card maybe expired or Is invalid Code")
        }

        let giftCard = {
            ...gift._doc,
            codes: gift.codes.find((code: any) => code._id)
        }


        return giftCard
    }


    async getTaxOption() {
        const tax = await Tax.aggregate([
            {
                $project: {
                    "_id": 0,
                    label: "$name",
                    value: "$_id",
                }
            }
        ])

        return tax
    }


    async getCouponByCode(code: string) {
        const coupon = await Coupon.findOne({
            code
        })
        if (!coupon || coupon.redeemed) {
            throw new BadRequest("Coupon maybe expired or Is invalid Code")
        }
        return coupon
    }

    async createShippingAddress(userInput: any, user: IUser) {
        const shipping = await Shipping.findOne({
            user: user._id
        })
        if (!shipping) {
            await Shipping.create(userInput);
            return {
                message: "Shipping address saved successfully!"
            }

        }

        const ship = await Shipping.findOneAndUpdate({
            user: user._id
        } ,userInput)
        if (!ship) {
            throw new Error("Something went wrong")
        }
        return {
            message: "Shipping address updated successfully!"
        }

    }

    async getShippingAddress(user: IUser) {
        const shipping = await Shipping.findOne({
            user: user._id
        })
        if (!shipping) {
            return {
                shippingSaved: false
            }
        }

        return {
            shipping,
            shippingSaved: true
        }
    }

    async create(userInput: any) {

        for (const cartProduct of userInput.cart) {
            const product = await Product.findById(cartProduct._id)
            if (!product) {
                throw new NotFound("Products does not exist!")
            }
        }

        if (userInput.coupon) {
            const coupon = await Coupon.findById(userInput.coupon);
            console.log("1",coupon)
            if (!coupon) {
                throw new BadRequest("Coupon not found!")
            }
            if (coupon.redeemed) {
                throw new BadRequest("Coupon is expired");
            }

            if (coupon.count >= coupon.limit) {
                console.log("2",coupon)
                await Coupon.findByIdAndUpdate(userInput.coupon, {
                    redeemed: true,
                    expiryDate: new Date()
                });
                throw new BadRequest("Coupon is expired");
            }

            if (new Date() > new Date(coupon.expiryDate)) {
                await Coupon.findByIdAndUpdate(userInput.coupon, {
                    redeemed: true,
                    expiryDate: new Date()
                });

                throw new BadRequest("Coupon is expired");
            }
            coupon.count += 1
            await Coupon.findByIdAndUpdate(userInput.coupon, coupon);
        }
        if (userInput.gift) {
            const gift = await Gift.findById(userInput.gift.id);
            if (!gift) {
                throw new BadRequest("Gift card not found!")
            }
            const codeIndex = gift.codes.findIndex(code => code._id.toString() === userInput.gift.codeId.toString())
            gift.codes[codeIndex].redeemed = true
            await Gift.findByIdAndUpdate(userInput.gift.id, gift);
        }


        userInput.skuId = makeRandomId(6)


       const order = await Order.create(userInput);

        const customerPlaceOrderMailPromise = sendPlaceOrderMail(userInput.userInfo.email);
        const adminPlaceOrderMailPromise = sendAdminPlaceOrderMail(userInput.userInfo.email, order.skuId)

        await Promise.all([customerPlaceOrderMailPromise, adminPlaceOrderMailPromise])

        for (const cartProduct of userInput.cart) {
          const product = await Product.findById(cartProduct._id)
          let inventoryIndex = product.inventory.findIndex(inventory => inventory._id.toString() === cartProduct.inventory._id.toString())
          product.inventory[inventoryIndex].quantity -= cartProduct.qty;
          await product.save();
        }

        return {
            message: "Order created successfully!",
           orderId: order.skuId
        }
    }
}

export default OrderService;
