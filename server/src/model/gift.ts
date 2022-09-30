import {model, Schema} from "mongoose";
import {IGift} from "../interface";

const GiftSchema: Schema<IGift> = new Schema({
    name: {
        type: String,
        required: true
    },
    codes: [
        {
            code: {
                type: String,
            },
            redeemed: {
                type: Boolean,
                default: false
            },
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        }
    ],
    description: {
        type: String,
        required: true
    },

    image: {
        avatar: String,
        cloudinary_id: String,
    },
    price: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Gift = model<IGift>('gift', GiftSchema);

export default Gift;
