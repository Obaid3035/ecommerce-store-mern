import {IController} from "../../interface";
import {NextFunction, Request, Response, Router} from "express";
import auth from "../../middleware/auth";
import {UserRole} from "../../model/user";
import {Container} from "typedi";
import ParentCategoryService from "../../services/admin/ParentCategoryService";

class ParentCategoryController implements IController {
    path = "/admin/parent-category"
    router = Router()

    constructor() {
        this.router
            .get(`${this.path}`, auth(UserRole.ADMIN), this.index)
            .post(`${this.path}`, auth(UserRole.ADMIN), this.create)
            .put(`${this.path}/:id`, auth(UserRole.ADMIN), this.update)
            .get(`${this.path}/:id`, auth(UserRole.ADMIN), this.show)
            .delete(`${this.path}/:id`, auth(UserRole.ADMIN), this.delete)
            .get(`${this.path}-select`, auth(UserRole.ADMIN), this.getParentCategoryOption)
            .get(`/parent-category`, this.getAllParentCategory)
    }

    private getAllParentCategory = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const categoryServiceInstance = Container.get(ParentCategoryService);
            const category = await categoryServiceInstance.getAllParentCategory();
            res.status(200).json(category);
        } catch (e) {
            next(e);
        }
    };


    private index = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const pageNo = parseInt(<string>req.query.page);
            const size = parseInt(<string>req.query.size);
            const { search } = req.query;
            const categoryServiceInstance = Container.get(ParentCategoryService);
            const category = await categoryServiceInstance.index(size * pageNo, size, search);
            res.status(200).json(category);
        } catch (e) {
            next(e);
        }
    };

    private create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const categoryServiceInstance = Container.get(ParentCategoryService);
            const category = await categoryServiceInstance.create(req.body);
            res.status(200).json(category);
        } catch (e) {
            next(e);
        }
    };

    private update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const categoryServiceInstance = Container.get(ParentCategoryService);
            const category = await categoryServiceInstance.update(req.body, req.params.id);
            res.status(200).json(category);
        } catch (e) {
            next(e);
        }
    };

    private show = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const categoryServiceInstance = Container.get(ParentCategoryService);
            const category = await categoryServiceInstance.show(req.params.id);
            res.status(200).json(category);
        } catch (e) {
            next(e);
        }
    };

    private delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const categoryServiceInstance = Container.get(ParentCategoryService);
            const category = await categoryServiceInstance.delete(req.params.id);
            res.status(200).json(category);
        } catch (e) {
            next(e);
        }
    };


    private getParentCategoryOption = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const categoryServiceInstance = Container.get(ParentCategoryService);
            const category = await categoryServiceInstance.getParentCategoryOption();
            res.status(200).json(category);
        } catch (e) {
            next(e);
        }
    };

}


export default ParentCategoryController;
