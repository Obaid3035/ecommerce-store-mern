import {IController} from "../../interface";
import {NextFunction, Request, Response, Router} from "express";
import auth from "../../middleware/auth";
import {UserRole} from "../../model/user";
import {Container} from "typedi";
import SeoService from "../../services/admin/SeoService";
import upload from "../../middleware/multer";

class SeoController implements IController{
    path = "/seo";
    router = Router()

    constructor() {
        this.router
            .get(`${this.path}/:id`, this.show)
            .post(`/menu`, auth(UserRole.ADMIN), upload.single("logo"), this.createMenu)
            .put(`/menu/:id`, auth(UserRole.ADMIN), upload.single("logo"), this.updateMenu)
            .get(`/menu`, this.showMenu)
            .post(`${this.path}`, auth(UserRole.ADMIN), this.create);
    }

    private show = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const seoServiceInstance = Container.get(SeoService);
            const seo = await seoServiceInstance.show(req.params.id);
            res.status(200).json(seo);
        } catch (e) {
            next(e);
        }
    };

    private showMenu = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const seoServiceInstance = Container.get(SeoService);
            const seo = await seoServiceInstance.showMenu();
            res.status(200).json(seo);
        } catch (e) {
            next(e);
        }
    };

    private updateMenu = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const seoServiceInstance = Container.get(SeoService);
            const seo = await seoServiceInstance.updateMenu(req.params.id, req.body, req.file);
            res.status(200).json(seo);
        } catch (e) {
            next(e);
        }
    };

    private create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const seoServiceInstance = Container.get(SeoService);
            const seo = await seoServiceInstance.create(req.body);
            res.status(200).json(seo);
        } catch (e) {
            next(e);
        }
    };

    private createMenu = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const seoServiceInstance = Container.get(SeoService);
            const seo = await seoServiceInstance.createMenu(req.body, req.file);
            res.status(200).json(seo);
        } catch (e) {
            next(e);
        }
    };
}

export default SeoController;
