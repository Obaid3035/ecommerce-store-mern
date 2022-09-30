import {Service} from "typedi";
import {IReview, IUser} from "../interface";
import Review from "../model/review";
import Order from "../model/order";

@Service()
class ReviewService {

    async index() {
        const reviews = await Review.find({
            approved: true
        }).limit(5).populate("order user");
        return reviews;
    }

    async userReviews(skip: number, limit: number, currUser: IUser) {
        const reviewPromise = await Review.find({
            user: currUser._id
        }).skip(skip).limit(limit).populate("order");
        const reviewCountPromise = Review.count({
            user: currUser._id
        });

        const [review, reviewCount] = await Promise.all([
            reviewPromise,
            reviewCountPromise,
        ]);

        const formattedAttributes = review.map((review: any) => {
            let obj = {
                name: `${review.order.userInfo.firstName} ${review.order.userInfo.lastName}`,
                text: review.text,
                approved: review.approved ? "APPROVED" : "NOT APPROVED"
            }
            return Object.values(obj);
        });


        return {
            data: formattedAttributes,
            count: reviewCount,
        };
    }

    async create(userInput: IReview, orderId: string) {
        userInput.order = orderId;
        await Review.create(userInput)
        return {
            message: "Order created successfully!"
        }
    }

    async verifyOrder(orderId: string) {
        const order = await Order.findOne({
            skuId: orderId
        });
        if (!order) {
            return  {
                order: false
            }
        }
        return {
            order: true,
            orderId: order._id
        }
    }
}

export default ReviewService;
