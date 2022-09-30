import  {Schema, model} from "mongoose";
import {IShipping} from "../interface";

const ShippingSchema: Schema<IShipping> = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    state: {
        _id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    }
});

const Shipping = model<IShipping>('shipping', ShippingSchema);

export default Shipping;
