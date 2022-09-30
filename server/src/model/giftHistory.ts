import  {Schema, model} from "mongoose";
import { IGiftHistory } from "../interface";

const GiftHistorySchema: Schema<IGiftHistory> = new Schema({
    email: {
        type: String,
        required: true,
    },
    giftCardName: {
      type: String,
      required: true
    },
    giftCardPrice: {
        type: Number,
        required: true
    },
    gift: {
        type: Schema.Types.ObjectId,
        ref: 'eGift',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    }
}, {
    timestamps: true
});

const GiftHistory = model<IGiftHistory>('GiftHistory', GiftHistorySchema);

export default GiftHistory;
