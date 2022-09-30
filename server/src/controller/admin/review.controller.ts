import {IController} from "../../interface";
import {NextFunction, Request, Response, Router} from "express";
import auth from "../../middleware/auth";
import {UserRole} from "../../model/user";
import {Container} from "typedi";
import ReviewService from "../../services/admin/ReviewService";

class ReviewController implements IController {
    path = "/admin/reviews"
    router = Router()

    constructor() {
        this.router
            .get(`${this.path}`, auth(UserRole.ADMIN), this.index)
            .get(`${this.path}/approved`, auth(UserRole.ADMIN), this.approvedReviews)
            .get(`${this.path}/rejected`, auth(UserRole.ADMIN), this.rejectedReviews)
            .put(`${this.path}/approved/:id`, auth(UserRole.ADMIN), this.toApprovedReviews)
            .put(`${this.path}/rejected/:id`, auth(UserRole.ADMIN), this.toRejectedReviews)
    }

    private index = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const pageNo = parseInt(<string>req.query.page);
            const size = parseInt(<string>req.query.size);
            const reviewServiceInstance = Container.get(ReviewService)
            const review = await reviewServiceInstance.index(size * pageNo, size);
            res.status(200).json(review);
        } catch (e) {
            next(e);
        }
    }

    private toApprovedReviews = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const reviewServiceInstance = Container.get(ReviewService)
            const review = await reviewServiceInstance.toApprovedReviews(req.params.id);
            res.status(200).json(review);
        } catch (e) {
            next(e);
        }
    }

    private toRejectedReviews = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const reviewServiceInstance = Container.get(ReviewService)
            const review = await reviewServiceInstance.toRejectedReviews(req.params.id);
            res.status(200).json(review);
        } catch (e) {
            next(e);
        }
    }

    private approvedReviews = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const pageNo = parseInt(<string>req.query.page);
            const size = parseInt(<string>req.query.size);
            const reviewServiceInstance = Container.get(ReviewService)
            const review = await reviewServiceInstance.approvedReviews(size * pageNo, size);
            res.status(200).json(review);
        } catch (e) {
            next(e);
        }
    }

    private rejectedReviews = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const pageNo = parseInt(<string>req.query.page);
            const size = parseInt(<string>req.query.size);
            const reviewServiceInstance = Container.get(ReviewService)
            const review = await reviewServiceInstance.rejectedReviews(size * pageNo, size);
            res.status(200).json(review);
        } catch (e) {
            next(e);
        }
    }


}

export default ReviewController;
