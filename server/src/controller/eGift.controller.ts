import {IController, IUser} from "../interface";
import {NextFunction, Request, Response, Router} from "express";
import auth from "../middleware/auth";
import {UserRole} from "../model/user";
import {Container} from "typedi";
import GiftService from "../services/GiftService";

class EGiftController implements IController{
    path = "/e-gift"
    router = Router()

    constructor() {
        this.router
            .get(`${this.path}`, auth(UserRole.CUSTOMER), this.index)
            .post(`${this.path}`, auth(UserRole.CUSTOMER), this.buyGiftCard);
    }

    private index = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const pageNo = parseInt(<string>req.query.page);
            const size = parseInt(<string>req.query.size);
            const giftServiceInstance = Container.get(GiftService);
            const gift = await giftServiceInstance.index(size * pageNo, size);
            res.status(200).json(gift);
        } catch (e) {
            next(e);
        }
    };

    private buyGiftCard = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const currUser: IUser = (req as any).user;
            const giftServiceInstance = Container.get(GiftService);
            const gift = await giftServiceInstance.buyGiftCard(currUser, req.body);
            res.status(200).json(gift);
        } catch (e) {
            next(e);
        }
    };
}

export default EGiftController;
