import {Service} from "typedi";
import Order, {ORDER_STATUS} from "../../model/order";
import BadRequest from "../../utils/errorCode";
import moment from 'moment';
import {formatAMPM, makeRandomId} from "../../utils/helper";
import User from "../../model/user";
import Gift from "../../model/gift";
import {sendGiftCardCodeMail} from "../../utils/emailService/email";
import ShippingCost from "../../model/shippingCost";

@Service()
class OrderService {

    async monthlyOrder() {
        const monthlySales = await Order.aggregate([
            {
                $match: {
                    status: ORDER_STATUS.COMPLETED,
                    createdAt: {
                        $gte: moment().utc(false).startOf('month').toDate(),
                        $lt: moment().utc(false).endOf('month').toDate(),
                    },
                },
            },
            {
                $addFields: { "day":  {$dateToString:{format: "%d", date: "$createdAt"}}}
            },
            {
                $group: {
                    _id: "$day",
                    amount: {
                        $sum: '$totalAmount',
                    },
                },
            },
        ]);

        return monthlySales
    }

    async yearlyOrder() {
        const yearlySales = await Order.aggregate([
            {
                $match: {
                    status: ORDER_STATUS.COMPLETED,
                    createdAt: {
                        $gte: moment().utc(false).startOf('year').toDate(),
                        $lt: moment().utc(false).endOf('year').toDate(),
                    },
                },
            },
            {
                $addFields: { "month":  {$dateToString:{format: "%m", date: "$createdAt"}}}
            },
            {
                $group: {
                    _id: "$month",
                    amount: {
                        $sum: '$totalAmount',
                    },
                },
            },
        ]);

        return yearlySales
    }

    async show(orderId: string) {
        const order = await Order.findById(orderId);
        if (!order) {
            throw new BadRequest("No Order Found")
        }
        return order;
    }

    async index(skip: number, limit: number, search: any) {

        let orderPromise;

        orderPromise = Order.aggregate([
            {
                $project: {
                    skuId: 1,
                    totalAmount: 1,
                    createdAt: 1,
                    status: 1
                }
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            },
            { $sort : { createdAt : -1 } }
        ])


        if (search) {
            orderPromise = Order.aggregate([
                {
                    $match: {
                        $text: {
                            $search: search
                        },
                    }
                },
                {
                    $project: {
                        skuId: 1,
                        totalAmount: 1,
                        createdAt: 1,
                        status: 1
                    }
                },
                {
                    $skip: skip
                },
                {
                    $limit: limit
                },
                { $sort : { createdAt : -1 } }
            ])
        }
        const orderCountPromise = Order.count();

        const [order, orderCount] = await Promise.all([
            orderPromise,
            orderCountPromise,
        ]);
        const formattedAttributes = order.map((order: any) => {
            let obj = {
                _id: order._id,
                skuId: order.skuId,
                totalAmount: order.totalAmount,
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

    async disputedOrder(skip: number, limit: number, search: any) {
        let orderPromise = Order.aggregate([
            {
                $match: {
                    status: ORDER_STATUS.DISPUTED
                }
            },
            {
                $project: {
                    skuId: 1,
                    totalAmount: 1,
                    createdAt: 1,
                    status: 1
                }
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            },
            { $sort : { createdAt : -1 } }
        ])

        if (search) {
            orderPromise = Order.aggregate([
                {
                    $match: {
                        status: ORDER_STATUS.DISPUTED,
                        $text: {
                            $search: search
                        },
                    }
                },
                {
                    $project: {
                        skuId: 1,
                        totalAmount: 1,
                        createdAt: 1,
                        status: 1
                    }
                },
                {
                    $skip: skip
                },
                {
                    $limit: limit
                },
                { $sort : { createdAt : -1 } }
            ])
        }
        const orderCountPromise = Order.count({
            status: ORDER_STATUS.DISPUTED
        });

        const [order, orderCount] = await Promise.all([
            orderPromise,
            orderCountPromise,
        ]);
        const formattedAttributes = order.map((order: any) => {
            let obj = {
                _id: order._id,
                skuId: order.skuId,
                totalAmount: order.totalAmount,
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

    async approvedDisputedOrder(skip: number, limit: number, search: any) {

        let orderPromise = Order.aggregate([
            {
                $match: {
                    status: ORDER_STATUS.DISPUTED_APPROVED
                }
            },
            {
                $project: {
                    skuId: 1,
                    totalAmount: 1,
                    createdAt: 1,
                    status: 1
                }
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            },
            { $sort : { createdAt : -1 } }
        ])

        if (search) {
            orderPromise = Order.aggregate([
                {
                    $match: {
                        status: ORDER_STATUS.DISPUTED_APPROVED,
                        $text: {
                            $search: search
                        },
                    }
                },
                {
                    $project: {
                        skuId: 1,
                        totalAmount: 1,
                        createdAt: 1,
                        status: 1
                    }
                },
                {
                    $skip: skip
                },
                {
                    $limit: limit
                },
                { $sort : { createdAt : -1 } }
            ])
        }

        const orderCountPromise = Order.count({
            status: ORDER_STATUS.DISPUTED_APPROVED
        });

        const [order, orderCount] = await Promise.all([
            orderPromise,
            orderCountPromise,
        ]);
        const formattedAttributes = order.map((order: any) => {
            let obj = {
                _id: order._id,
                skuId: order.skuId,
                totalAmount: order.totalAmount,
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


    async pendingOrder(skip: number, limit: number, search: any) {

        let orderPromise = Order.aggregate([
            {
              $match: {
                  status: ORDER_STATUS.PENDING
              }
            },
            {
                $project: {
                    skuId: 1,
                    totalAmount: 1,
                    createdAt: 1,
                    status: 1
                }
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            },
            { $sort : { createdAt : -1 } }
        ])

        if (search) {
            orderPromise = Order.aggregate([
                {
                    $match: {
                        status: ORDER_STATUS.PENDING,
                        $text: {
                            $search: search
                        },
                    }
                },
                {
                    $project: {
                        skuId: 1,
                        totalAmount: 1,
                        createdAt: 1,
                        status: 1
                    }
                },
                {
                    $skip: skip
                },
                {
                    $limit: limit
                },
                { $sort : { createdAt : -1 } }
            ])
        }


        const orderCountPromise = Order.count({
            status: ORDER_STATUS.PENDING
        });

        const [order, orderCount] = await Promise.all([
            orderPromise,
            orderCountPromise,
        ]);
        const formattedAttributes = order.map((order: any) => {
            let obj = {
                _id: order._id,
                skuId: order.skuId,
                totalAmount: order.totalAmount,
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


    async inProgressOrder(skip: number, limit: number, search: any) {

        let orderPromise = Order.aggregate([
            {
                $match: {
                    status: ORDER_STATUS.IN_PROGRESS
                }
            },
            {
                $project: {
                    skuId: 1,
                    totalAmount: 1,
                    createdAt: 1,
                    status: 1
                }
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            },
            { $sort : { createdAt : -1 } }
        ])

        if (search) {
            orderPromise = Order.aggregate([
                {
                    $match: {
                        status: ORDER_STATUS.IN_PROGRESS,
                        $text: {
                            $search: search
                        },
                    }
                },
                {
                    $project: {
                        skuId: 1,
                        totalAmount: 1,
                        createdAt: 1,
                        status: 1
                    }
                },
                {
                    $skip: skip
                },
                {
                    $limit: limit
                },
                { $sort : { createdAt : -1 } }
            ])
        }

        const orderCountPromise = Order.count({
            status: ORDER_STATUS.IN_PROGRESS
        });

        const [order, orderCount] = await Promise.all([
            orderPromise,
            orderCountPromise,
        ]);
        const formattedAttributes = order.map((order: any) => {
            let obj = {
                _id: order._id,
                skuId: order.skuId,
                totalAmount: order.totalAmount,
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

    async completedOrder(skip: number, limit: number, search: any) {

        let orderPromise = Order.aggregate([
            {
                $match: {
                    status: ORDER_STATUS.COMPLETED
                }
            },
            {
                $project: {
                    skuId: 1,
                    totalAmount: 1,
                    createdAt: 1,
                    status: 1
                }
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            },
            { $sort : { createdAt : -1 } }
        ])

        if (search) {
            orderPromise = Order.aggregate([
                {
                    $match: {
                        status: ORDER_STATUS.COMPLETED,
                        $text: {
                            $search: search
                        },
                    }
                },
                {
                    $project: {
                        skuId: 1,
                        totalAmount: 1,
                        createdAt: 1,
                        status: 1
                    }
                },
                {
                    $skip: skip
                },
                {
                    $limit: limit
                },
                { $sort : { createdAt : -1 } }
            ])
        }

        const orderCountPromise = Order.count({
            status: ORDER_STATUS.COMPLETED
        });

        const [order, orderCount] = await Promise.all([
            orderPromise,
            orderCountPromise,
        ]);
        const formattedAttributes = order.map((order: any) => {
            let obj = {
                _id: order._id,
                skuId: order.skuId,
                totalAmount: order.totalAmount,
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

    async cancelledOrder(skip: number, limit: number, search: any) {
        let orderPromise = Order.aggregate([
            {
                $match: {
                    status: ORDER_STATUS.CANCELLED
                }
            },
            {
                $project: {
                    skuId: 1,
                    totalAmount: 1,
                    createdAt: 1,
                    status: 1
                }
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            },
            { $sort : { createdAt : -1 } }
        ])

        if (search) {
            orderPromise = Order.aggregate([
                {
                    $match: {
                        status: ORDER_STATUS.CANCELLED,
                        $text: {
                            $search: search
                        },
                    }
                },
                {
                    $project: {
                        skuId: 1,
                        totalAmount: 1,
                        createdAt: 1,
                        status: 1
                    }
                },
                {
                    $skip: skip
                },
                {
                    $limit: limit
                },
                { $sort : { createdAt : -1 } }
            ])
        }
        const orderCountPromise = Order.count({
            status: ORDER_STATUS.CANCELLED
        });

        const [order, orderCount] = await Promise.all([
            orderPromise,
            orderCountPromise,
        ]);
        const formattedAttributes = order.map((order: any) => {
            let obj = {
                _id: order._id,
                skuId: order.skuId,
                totalAmount: order.totalAmount,
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

    async toInProgressOrder(orderId: string) {
        await Order.findByIdAndUpdate(orderId, {
            status: ORDER_STATUS.IN_PROGRESS
        });
        return {
            message: "Order has been updated successfully!"
        }
    }

    async toApprovedDispute(orderId: string) {
        await Order.findByIdAndUpdate(orderId, {
            status: ORDER_STATUS.DISPUTED_APPROVED
        });

        return {
            message: "Order has been updated successfully!"
        }
    }
    async toCompletedOrder(orderId: string) {
        await Order.findByIdAndUpdate(orderId, {
            status: ORDER_STATUS.COMPLETED,
            disputeMessage: ""
        });
        return {
            message: "Order has been updated successfully!"
        }
    }

    async toDisputedApprovedOrder(orderId: string) {
        const order = await Order.findById(orderId);

        const user = await User.findById(order.user);

        if (!order) {
            throw new BadRequest("No Order Found")
        }
        await Order.findByIdAndUpdate(orderId, {
            status: ORDER_STATUS.DISPUTED_APPROVED,
        });
        const shippingCost = await ShippingCost.findOne()
        const giftCard = await Gift.create({
            name: "Refund",
            codes: [
                {
                    code: makeRandomId(5),
                    redeemed: false
                }
            ],
            price: order.totalAmount - shippingCost.price,
            description: order.disputeMessage,
        })


        await sendGiftCardCodeMail(user.email, giftCard.codes[0].code);
        return {
            message: "Order has been updated successfully!"
        }
    }

    async toCancelledOrder(orderId: string) {
        await Order.findByIdAndUpdate(orderId, {
            status: ORDER_STATUS.CANCELLED
        });

        return {
            message: "Order has been updated successfully!"
        }
    }

}

export default OrderService;
