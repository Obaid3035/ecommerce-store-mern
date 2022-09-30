import  {Schema, model} from "mongoose";
import { IReview } from "../interface";


const ReviewSchema: Schema<IReview> = new Schema({
    text: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean,
        required: true,
        default: false
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'order',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
});

const Review = model<IReview>('review', ReviewSchema);

export default Review;
