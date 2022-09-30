import { IController } from "../../interface";
import { NextFunction, Request, Response, Router } from "express";
import auth from "../../middleware/auth";
import { UserRole } from "../../model/user";
import { Container } from "typedi";
import RoleService from "../../services/admin/RoleService";

class RoleController implements IController {
  path = "/admin/roles";
  router = Router();

  constructor() {
    this.router
      .get(`${this.path}`, auth(UserRole.ADMIN), this.index)
      .post(`${this.path}`, auth(UserRole.ADMIN), this.create)
      .get(`${this.path}/:id`, auth(UserRole.ADMIN), this.show)
      .put(`${this.path}/:id`, auth(UserRole.ADMIN), this.update)
      .get(`${this.path}-select`, auth(UserRole.ADMIN), this.getRolesSelect)
  }

  private index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pageNo = parseInt(<string>req.query.page);
      const size = parseInt(<string>req.query.size);
      const roleServiceInstance = Container.get(RoleService);
      const role = await roleServiceInstance.index(size * pageNo, size);
      res.status(200).json(role);
    } catch (e) {
      next(e);
    }
  }

  private create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roleServiceInstance = Container.get(RoleService);
      const role = await roleServiceInstance.create(req.body);
      res.status(200).json(role);
    } catch (e) {
      next(e);
    }
  }

  private update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roleServiceInstance = Container.get(RoleService);
      const role = await roleServiceInstance.update(req.body, req.params.id);
      res.status(200).json(role);
    } catch (e) {
      next(e);
    }
  }

  private show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roleServiceInstance = Container.get(RoleService);
      const role = await roleServiceInstance.show(req.params.id);
      res.status(200).json(role);
    } catch (e) {
      next(e);
    }
  }

  private getRolesSelect = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const roleServiceInstance = Container.get(RoleService);
      const role = await roleServiceInstance.getRolesSelect();
      res.status(200).json(role);
    } catch (e) {
      next(e);
    }
  }
}

export default RoleController;
