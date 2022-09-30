import { IController } from "../../interface";
import { NextFunction, Request, Response, Router } from "express";
import { Container } from "typedi";
import AttributeService from "../../services/admin/AttributeService";
import auth from "../../middleware/auth";
import { UserRole } from "../../model/user";

class AttributeController implements IController {
  path: string = '/admin/attribute';

  router = Router();

  constructor() {
    this.router
      .get(`${this.path}`, auth(UserRole.ADMIN), this.index)
      .post(`${this.path}`, auth(UserRole.ADMIN), this.create)
      .put(`${this.path}/:id`, auth(UserRole.ADMIN), this.update)
      .get(`${this.path}/:id`, auth(UserRole.ADMIN), this.show)
      .delete(`${this.path}/:id`, auth(UserRole.ADMIN), this.delete)
      .get(`${this.path}-select`, this.getAttributeOptions)
  }

  private index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pageNo = parseInt(<string>req.query.page);
      const size = parseInt(<string>req.query.size);
      const { search } = req.query;
      const attributeServiceInstance = Container.get(AttributeService);
      const attribute = await attributeServiceInstance.index(size * pageNo, size, search);
      res.status(200).json(attribute);
    } catch (e) {
      next(e);
    }
  };

  private create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const attributeServiceInstance = Container.get(AttributeService);
      const attribute = await attributeServiceInstance.create(req.body);
      res.status(200).json(attribute);
    } catch (e) {
      next(e);
    }
  };

  private update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const attributeServiceInstance = Container.get(AttributeService);
      const attribute = await attributeServiceInstance.update(req.body, req.params.id);
      res.status(200).json(attribute);
    } catch (e) {
      next(e);
    }
  };

  private show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const attributeServiceInstance = Container.get(AttributeService);
      const attribute = await attributeServiceInstance.show(req.params.id);
      res.status(200).json(attribute);
    } catch (e) {
      next(e);
    }
  };

  private delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const attributeServiceInstance = Container.get(AttributeService);
      const attribute = await attributeServiceInstance.delete(req.params.id);
      res.status(200).json(attribute);
    } catch (e) {
      next(e);
    }
  };

  private getAttributeOptions = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const attributeServiceInstance = Container.get(AttributeService);
      const attribute = await attributeServiceInstance.getAttributeOptions();
      res.status(200).json(attribute);
    } catch (e) {
      next(e)
    }
  }
}

export default AttributeController;
