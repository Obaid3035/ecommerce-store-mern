import {IController} from "../../interface";
import {NextFunction, Request, Response, Router} from "express";
import auth from "../../middleware/auth";
import {UserRole} from "../../model/user";
import {Container} from "typedi";
import ColorService from "../../services/admin/ColorService";

class ColorController implements IController {
    path = "/admin/color";
    router = Router();

    constructor() {
        this.router
            .get(`${this.path}`, auth(UserRole.ADMIN), this.index)
            .post(`${this.path}`, auth(UserRole.ADMIN), this.create)
            .put(`${this.path}/:id`, auth(UserRole.ADMIN), this.update)
            .delete(`${this.path}/:id`, auth(UserRole.ADMIN), this.delete)
            .get(`${this.path}/:id`, auth(UserRole.ADMIN), this.show)
            .get(`${this.path}-select`, auth(UserRole.ADMIN), this.getColorOption)
    }

    private index = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const pageNo = parseInt(<string>req.query.page);
            const size = parseInt(<string>req.query.size);
            const colorServiceInstance = Container.get(ColorService);
            const color = await colorServiceInstance.index(size * pageNo, size);
            res.status(200).json(color);
        } catch (e) {
            next(e);
        }
    };

    private create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const colorServiceInstance = Container.get(ColorService);
            const color = await colorServiceInstance.create(req.body);
            res.status(200).json(color);
        } catch (e) {
            next(e);
        }
    };

    private update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const colorServiceInstance = Container.get(ColorService);
            const color = await colorServiceInstance.update(req.body, req.params.id);
            res.status(200).json(color);
        } catch (e) {
            next(e);
        }
    };

    private show = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const colorServiceInstance = Container.get(ColorService);
            const color = await colorServiceInstance.show(req.params.id);
            res.status(200).json(color);
        } catch (e) {
            next(e);
        }
    };

    private getColorOption = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const colorServiceInstance = Container.get(ColorService);
            const color = await colorServiceInstance.getColorOption();
            res.status(200).json(color);
        } catch (e) {
            next(e);
        }
    };

    private delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const colorServiceInstance = Container.get(ColorService);
            const color = await colorServiceInstance.delete(req.params.id);
            res.status(200).json(color);
        } catch (e) {
            next(e);
        }
    };

}

export default ColorController;
