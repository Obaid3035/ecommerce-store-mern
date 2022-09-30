import {IController} from "../../interface";
import {NextFunction, Request, Response, Router} from "express";
import auth from "../../middleware/auth";
import User, {UserRole} from "../../model/user";
import {Container} from "typedi";
import UserService from "../../services/admin/UserService";


class UserController implements IController {
    path = "/admin/user";
    router = Router()

    constructor() {
        this.router
            .get(`${this.path}`, auth(UserRole.ADMIN), this.index)
            .post(`${this.path}`, auth(UserRole.ADMIN), this.create)
            .put(`${this.path}/:id`, auth(UserRole.ADMIN), this.update)
            .delete(`${this.path}/:id`, auth(UserRole.ADMIN), this.delete)
            .get(`${this.path}/:id`, auth(UserRole.ADMIN), this.show)
            .get(`/admin/picture-approval`, auth(UserRole.ADMIN), this.getPictureApproval)
            .post(`/shipping-cost`, auth(UserRole.ADMIN), this.createShippingCost)
            .get(`/shipping-cost`, auth(UserRole.ADMIN), this.showShippingCost)
            .put(`/shipping-cost/:id`, auth(UserRole.ADMIN), this.updateShippingCost)
    }

    private update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userServiceInstance = Container.get(UserService);
            const user = await userServiceInstance.update(req.params.id, req.body);
            res.status(200).json(user);
        } catch (e) {
            next(e);
        }
    };

    private delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userServiceInstance = Container.get(UserService);
            const user = await userServiceInstance.delete(req.params.id);
            res.status(200).json(user);
        } catch (e) {
            next(e);
        }
    };

    private index = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const pageNo = parseInt(<string>req.query.page);
            const size = parseInt(<string>req.query.size);
            const userServiceInstance = Container.get(UserService);
            const user = await userServiceInstance.index(size * pageNo, size);
            res.status(200).json(user);
        } catch (e) {
            next(e);
        }
    };

    private show = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userServiceInstance = Container.get(UserService);
            const user = await userServiceInstance.show(req.params.id);
            res.status(200).json(user);
        } catch (e) {
            next(e);
        }
    }

    private create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userServiceInstance = Container.get(UserService);
            await User.userExist(req.body.email);
            const user = await userServiceInstance.create(req.body);
            res.status(200).json(user);
        } catch (e) {
            next(e);
        }
    };

    private getPictureApproval = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const userServiceInstance = Container.get(UserService);
            const images = await userServiceInstance.getPictureApproval();
            res.status(200).json(images);
        } catch (e) {
            next(e);
        }
    }

    private showShippingCost = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const userServiceInstance = Container.get(UserService);
            const shippingCost = await userServiceInstance.showShippingCost();
            res.status(200).json(shippingCost);
        } catch (e) {
            next(e);
        }
    }

    private createShippingCost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userServiceInstance = Container.get(UserService);
            const shippingCost = await userServiceInstance.createShippingCost(req.body);
            res.status(200).json(shippingCost);
        } catch (e) {
            next(e);
        }
    }

    private updateShippingCost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userServiceInstance = Container.get(UserService);
            const shippingCost = await userServiceInstance.updateShippingCost(req.body, req.params.id);
            res.status(200).json(shippingCost);
        } catch (e) {
            next(e);
        }
    }
}

export default UserController;
