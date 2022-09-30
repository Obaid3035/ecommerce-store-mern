import { model, Schema } from 'mongoose';
import { IProduct } from '../interface';
import {makeRandomId} from "../utils/helper";

const ProductSchema: Schema<IProduct> = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: [
        {
            avatar: String,
            cloudinary_id: String,
        },
    ],
    price: {
        type: Number,
        required: true,
    },

    discountPrice: {
        type: Number,
        required: true,
        default: 0,
    },

    inventory: [
        {
            color: {
                type: Schema.Types.ObjectId,
                ref: 'color',
            },
            size: {
                type: String,
            },
            quantity: {
                type: Number,
                default: 0,
            },
        }
    ],

    productIdentifier: {
        type: String,
        default: makeRandomId(6),
        required: true
    },
    subCategory: [
        {
            type: Schema.Types.ObjectId,
            ref: 'subCategory',
        },
    ],
    parentCategory: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'parentCategory',
    },
    attribute: [
        {
            type: Schema.Types.ObjectId,
            ref: 'attribute',
        },
    ],

    weight: {
        unit: {
            type: String,
            required: true,
        },
        value: {
            type: Number,
            required: true,
        }
    }
});

ProductSchema.index({
    // productIdentifier: "text",
    name: "text"
})

const Product = model<IProduct>('product', ProductSchema);

export default Product;
