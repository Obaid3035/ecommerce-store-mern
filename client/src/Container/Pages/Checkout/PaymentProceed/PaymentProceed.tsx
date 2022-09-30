import React, { useEffect, useState } from 'react'
import './PaymentProceed.scss'
import { Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { createOrder, createPaymentIntent, getCostDetail } from "../../../../api/order";
import { errorNotify, successNotify } from "../../../../utils/toast";
import { getCurrentUser, removeCart, removeUserInfo } from "../../../../utils/helper";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import AddressInfo from "./AddressInfo/AddressInfo";
import GiftActivate from './GiftActivate/GiftActivate'
import CouponActive from './CouponActivate/CouponActivate'
import CheckoutPayment from './CheckoutPayment/CheckoutPayment'
import TaxAndDiscounts from './TaxAndDiscount/TaxAndDiscount'

const PaymentProceed: React.FC<any> = ({ personalInfo, cart }) => {
    const navigate = useNavigate()
    const stripe = useStripe();
    const elements = useElements();
    const [giftCode, setGiftCode] = useState("")
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [couponCode, setCouponCode] = useState("")
    const [gift, setGift] = useState<any>(null);
    const [coupon, setCoupon] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [discount, setDiscount] = useState(0);
    const [giftDiscount, setGiftDiscount] = useState(0);
    const [couponDiscount, setCouponDiscount] = useState(0);
    const [costLoader, setCostLoader] = useState(false)
    const [costDetail, setCostDetail] = useState<any>(null)
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        setTotalPrice(cart.reduce((curVal: any, acc: any) => {
            if (acc.discountPrice <= 0) {
                let total = acc.price * acc.qty;
                return curVal + total
            } else {
                let total = acc.discountPrice * acc.qty;
                return curVal + total
            }
        }, 0))
        setCostLoader(true)
        getCostDetail(personalInfo.userInfo.state._id)
            .then((res) => {
                setCostLoader(false)
                setCostDetail(res.data)
            })
    }, [])


    const onOrderCreateHandler = (order: any) => {
        if (getCurrentUser()) {
            order.user = getCurrentUser()._id
        }
        if (gift) {
            order.gift = {
                id: gift._id,
                codeId: gift.codes._id
            }
        }
        if (coupon) {
            order.coupon = coupon._id
        }
        createOrder(order)
            .then((res) => {
                successNotify(res.data.message)
                removeCart()
                removeUserInfo()
                setIsLoading(false)
                navigate(`/thankyou/${res.data.orderId}`)
            })
            .catch((e) => {
                errorNotify(e.response.data.message);
                navigate(`/`)
                setIsLoading(false)
                removeCart()
                removeUserInfo()
            })
    }

    const onPlaceOrderHandler = async () => {
        setIsLoading(true)
        let totalAmount = totalPrice - discount + (((totalPrice - discount) * costDetail.tax) / 100) + costDetail.shippingCost
        if (totalPrice >= 1000) {
            totalAmount -= costDetail.shippingCost
        }
        if (totalAmount <= 0) {
            totalAmount = 0;
        }
        const order: any = {
            cart,
            ...personalInfo,
            totalAmount,
            amount: totalPrice,
            paymentMethod,
        }

        if (paymentMethod === "card") {
            if (!stripe || !elements) {
                setIsLoading(false)
                return;
            }
            const cardElement = elements.getElement(CardElement)!
            const paymentSecret = await createPaymentIntent({
                totalAmount,
                email: personalInfo.userInfo.email
            });
            const card = await stripe.confirmCardPayment(paymentSecret.data.secret, {
                payment_method: {
                    card: cardElement,
                }
            })

            if (card.error) {
                setIsLoading(false)
                errorNotify(card.error.message!)
            } else {
                onOrderCreateHandler(order)
            }

        } else {
            onOrderCreateHandler(order)
        }
    }

    const getTotalPrice = () => {
        let total = (totalPrice - discount + (((totalPrice - discount) * costDetail.tax) / 100) + costDetail.shippingCost).toFixed(2);
        if (total <= 0) {
            return 0
        }

        console.log(totalPrice >= costDetail.freeLimit)
        if (totalPrice >= costDetail.freeLimit) {
            return total - costDetail.shippingCost
        }
        return total
    }

    return (
        costDetail && !costLoader ? (
            <div>
                <div className='Address_delivery_container'>
                    <AddressInfo shippingDetail={personalInfo.userInfo} totalPrice={totalPrice} />

                    <div className='gift_coupons_container btns_container'>
                        <GiftActivate giftCode={giftCode} setGiftCode={setGiftCode} setGiftDiscount={setGiftDiscount} setDiscount={setDiscount} gift={gift} setGift={setGift} discount={discount} />
                        <CouponActive costDetail={costDetail} couponCode={couponCode} setCouponCode={setCouponCode} setCouponDiscount={setCouponDiscount} setDiscount={setDiscount} coupon={coupon} setCoupon={setCoupon} discount={discount} totalPrice={totalPrice} />
                    </div>

                    <TaxAndDiscounts giftDiscount={giftDiscount} setGiftCode={setGiftCode} setGift={setGift}
                                     setGiftDiscount={setGiftDiscount} couponDiscount={couponDiscount} gift={gift}
                                     costDetail={costDetail} setCouponCode={setCouponCode} setCouponDiscount={setCouponDiscount}
                                     coupon={coupon} setCoupon={setCoupon}
                                     getTotalPrice={getTotalPrice}
                                     discount={discount} setDiscount={setDiscount} totalPrice={totalPrice}
                    />
                </div>
                <CheckoutPayment getTotalPrice={getTotalPrice} setPaymentMethod={setPaymentMethod} paymentMethod={paymentMethod} />
                <div className='btns_container'>
                    <div>
                        <button className='shopping'>CONTINUE SHOPPING</button>
                    </div>
                    {
                        !isLoading ?
                            (
                                <div>
                                    <button type={"submit"} className='proceed_step' onClick={onPlaceOrderHandler}>PLACE
                                        ORDER
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <Spinner animation={"border"} />
                                </div>
                            )
                    }
                </div>
            </div>
        ) : (
            <div className="text-center">
                <Spinner animation={"border"} />
            </div>
        )
    )
}
export default PaymentProceed
