import  {Schema, model} from "mongoose";
import { IWishList} from "../interface";

const WishListSchema: Schema<IWishList> = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    }
});

const WishList = model<IWishList>('wishlist', WishListSchema);

export default WishList;
