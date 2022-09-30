import {Service} from "typedi";
import Review from "../../model/review";

@Service()
class ReviewService {
    async index(skip: number, limit: number) {
        const reviewPromise = Review.find()
            .skip(skip)
            .limit(limit).populate("order").select("text approved");
        const reviewCountPromise = Review.count();

        const [review, reviewCount] = await Promise.all([
            reviewPromise,
            reviewCountPromise,
        ]);
        const formattedAttributes = review.map((review: any) => {
            let obj = {
                _id: review._id,
                name: `${review.order.userInfo.firstName} ${review.order.userInfo.lastName}`,
                text: review.text,
                approved: review.approved ? "APPROVED" : "REJECTED"
            }
            return Object.values(obj);
        });

        return {
            data: formattedAttributes,
            count: reviewCount,
        };
    }

    async toApprovedReviews(reviewId: string) {
        await Review.findByIdAndUpdate(reviewId, {
            approved: true
        });

        return {
            message: "Review approved successfully!"
        }
    }

    async toRejectedReviews(reviewId: string) {
        await Review.findByIdAndUpdate(reviewId, {
            approved: false
        });

        return {
            message: "Review rejected successfully!"
        }
    }

    async approvedReviews(skip: number, limit: number) {
        const reviewPromise = Review.find({
            approved: true
        })
            .skip(skip)
            .limit(limit).populate("order").select("text approved");
        const reviewCountPromise = Review.count({
            approved: true
        });

        const [review, reviewCount] = await Promise.all([
            reviewPromise,
            reviewCountPromise,
        ]);
        const formattedAttributes = review.map((review: any) => {
            let obj = {
                _id: review._id,
                name: `${review.order.userInfo.firstName} ${review.order.userInfo.lastName}`,
                text: review.text,
                approved: review.approved ? "APPROVED" : "REJECTED"
            }
            return Object.values(obj);
        });

        return {
            data: formattedAttributes,
            count: reviewCount,
        };
    }


    async rejectedReviews(skip: number, limit: number) {
        const reviewPromise = Review.find({
            approved: false
        })
            .skip(skip)
            .limit(limit).populate("order").select("text approved");
        const reviewCountPromise = Review.count({
            approved: false
        });

        const [review, reviewCount] = await Promise.all([
            reviewPromise,
            reviewCountPromise,
        ]);
        const formattedAttributes = review.map((review: any) => {
            let obj = {
                _id: review._id,
                name: `${review.order.userInfo.firstName} ${review.order.userInfo.lastName}`,
                text: review.text,
                approved: review.approved ? "APPROVED" : "REJECTED"
            }
            return Object.values(obj);
        });

        return {
            data: formattedAttributes,
            count: reviewCount,
        };
    }
}

export default ReviewService;
