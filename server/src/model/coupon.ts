import  {Schema, model} from "mongoose";
import {ICoupon} from "../interface";

const CouponSchema: Schema<ICoupon> = new Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    discountPrice: {
        type: Number,
        required: true
    },
    redeemed: {
        type: Boolean,
        required: true,
        default: false
    },
    expiryDate: {
        type: Date,
        required: true
    },
    count: {
        type: Number,
        default: 0,
    },
    limit: {
        type: Number,
        required: true
    },
    priceLimit: {
        type: Number,
        required: true
    }
});

CouponSchema.index({
    code: "text",
})


const Coupon = model<ICoupon>('coupon', CouponSchema);

export default Coupon;
