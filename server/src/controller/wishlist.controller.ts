import {IController} from "../interface";
import {NextFunction, Request, Response, Router} from "express";
import auth from "../middleware/auth";
import {UserRole} from "../model/user";
import {Container} from "typedi";
import WishListService from "../services/WishListService";

class WishlistController implements IController {
    path = "/wishlist"
    router = Router()

    constructor() {
        this.router
            .get(`${this.path}`, auth(UserRole.ALL), this.index)
            .post(`${this.path}/:id`, auth(UserRole.ALL), this.create)
            .delete(`${this.path}/:id`, auth(UserRole.ALL), this.delete)
    }

    private index = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const wishListServiceInstance = Container.get(WishListService);
            const user = (req as any).user;
            const wishList = await wishListServiceInstance.index(user._id)
            res.status(201).json(wishList);
        } catch (e) {
            next(e);
        }
    }

    private create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const wishListServiceInstance = Container.get(WishListService);
            const user = (req as any).user;
            const wishList = await wishListServiceInstance.create(req.params.id, user._id)
            res.status(201).json(wishList);
        } catch (e) {
            next(e);
        }
    }

    private delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const wishListServiceInstance = Container.get(WishListService);
            const wishList = await wishListServiceInstance.delete(req.params.id)
            res.status(201).json(wishList);
        } catch (e) {
            next(e);
        }
    }
}

export default WishlistController;
