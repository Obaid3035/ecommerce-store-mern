import { NextFunction, Request, Response, Router } from "express";
import auth from "../../middleware/auth";
import { UserRole } from "../../model/user";
import { Container } from "typedi";
import SubCategoryService from "../../services/admin/SubCategoryService";

class SubCategoryController {
  path: string = '/admin/sub-category';

  router = Router();

  constructor() {
    this.router
      .get(`${this.path}`, auth(UserRole.ADMIN), this.index)
      .post(`${this.path}`, auth(UserRole.ADMIN), this.create)
      .put(`${this.path}/:id`, auth(UserRole.ADMIN), this.update)
      .get(`${this.path}/:id`, auth(UserRole.ADMIN), this.show)
      .delete(`${this.path}/:id`, auth(UserRole.ADMIN), this.delete)
      .get(`${this.path}-select`, auth(UserRole.ADMIN), this.getCategoryOption)
        .get(`${this.path}-select/:id`, auth(UserRole.ADMIN), this.getCategoryByParentOption)
  }


  private index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pageNo = parseInt(<string>req.query.page);
      const size = parseInt(<string>req.query.size);
      const { search } = req.query;
      const categoryServiceInstance = Container.get(SubCategoryService);
      const category = await categoryServiceInstance.index(size * pageNo, size, search);
      res.status(200).json(category);
    } catch (e) {
      next(e);
    }
  };

  private create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryServiceInstance = Container.get(SubCategoryService);
      const category = await categoryServiceInstance.create(req.body);
      res.status(200).json(category);
    } catch (e) {
      next(e);
    }
  };

  private update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryServiceInstance = Container.get(SubCategoryService);
      const category = await categoryServiceInstance.update(req.body, req.params.id);
      res.status(200).json(category);
    } catch (e) {
      next(e);
    }
  };

  private show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryServiceInstance = Container.get(SubCategoryService);
      const category = await categoryServiceInstance.show(req.params.id);
      res.status(200).json(category);
    } catch (e) {
      next(e);
    }
  };

  private delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryServiceInstance = Container.get(SubCategoryService);
      const category = await categoryServiceInstance.delete(req.params.id);
      res.status(200).json(category);
    } catch (e) {
      next(e);
    }
  };


  private getCategoryOption = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryServiceInstance = Container.get(SubCategoryService);
      const category = await categoryServiceInstance.getCategoryOption();
      res.status(200).json(category);
    } catch (e) {
      next(e);
    }
  };

  private getCategoryByParentOption = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryServiceInstance = Container.get(SubCategoryService);
      const category = await categoryServiceInstance.getCategoryByParentOption(req.params.id);
      res.status(200).json(category);
    } catch (e) {
      next(e);
    }
  };
}

export default SubCategoryController;
