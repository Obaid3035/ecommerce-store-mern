import {Service} from "typedi";
import WishList from "../model/wishList";
import BadRequest from "../utils/errorCode";

@Service()
class WishListService {
    async index(userId: string) {
        const wishList = await WishList.find({
            user: userId
        }).populate("product");
        return wishList;
    }

    async create(productId: string, userId: string) {
        const wishList = await WishList.findOne({
            product: productId,
            user: userId
        })
        if (wishList) {
            throw new BadRequest("Products already added")
        }
        await WishList.create({
            product: productId,
            user: userId
        })
        return {
            message: "Wish List created successfully!"
        }
    }

    async delete(wishListId: string) {
        await WishList.findByIdAndDelete(wishListId)
        return {
            message: "Wish List deleted successfully!"
        }
    }
}

export default WishListService;
