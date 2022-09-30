import {IController} from "../interface";
import {NextFunction, Request, Response, Router} from "express";
import {Container} from "typedi";
import ReviewService from "../services/ReviewService";
import auth from "../middleware/auth";
import {UserRole} from "../model/user";

class ReviewController implements IController {
    path = "/reviews";
    router = Router();

    constructor() {
        this.router
            .get(`${this.path}`, this.index)
            .get(`${this.path}/current`, auth(UserRole.CUSTOMER), this.userReviews)
            .post(`${this.path}/:id`, this.create)
            .get(`/verify-order/:id`, this.verifyOrder)
    }

    private index = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const reviewServiceInstance = Container.get(ReviewService);
            const review = await reviewServiceInstance.index()
            res.status(201).json(review);
        } catch (e) {
            next(e);
        }
    }


    private userReviews = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const pageNo = parseInt(<string>req.query.page);
            const size = parseInt(<string>req.query.size);
            const reviewServiceInstance = Container.get(ReviewService);
            const user = (req as any).user;
            const review = await reviewServiceInstance.userReviews(pageNo, size, user)
            res.status(201).json(review);
        } catch (e) {
            next(e);
        }
    }

    private verifyOrder = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const reviewServiceInstance = Container.get(ReviewService);
            const review = await reviewServiceInstance.verifyOrder(req.params.id)
            res.status(201).json(review);
        } catch (e) {
            next(e);
        }
    }

    private create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const reviewServiceInstance = Container.get(ReviewService);
            const review = await reviewServiceInstance.create(req.body, req.params.id)
            res.status(201).json(review);
        } catch (e) {
            next(e);
        }
    }
}

export default ReviewController
