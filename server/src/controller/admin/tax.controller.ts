import { IController } from "../../interface";
import { NextFunction, Request, Response, Router } from "express";
import { Container } from "typedi";
import auth from "../../middleware/auth";
import { UserRole } from "../../model/user";
import TaxService from "../../services/admin/TaxService";

class TaxController implements IController{
  path = "/admin/tax";
  router = Router();

  constructor() {
    this.router
      .get(`${this.path}`, auth(UserRole.ADMIN), this.index)
      .post(`${this.path}`, auth(UserRole.ADMIN), this.create)
      .put(`${this.path}/:id`, auth(UserRole.ADMIN), this.update);
  }


  private index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pageNo = parseInt(<string>req.query.page);
      const size = parseInt(<string>req.query.size);
      const { search } = req.query;
      const taxServiceInstance = Container.get(TaxService);
      const tax = await taxServiceInstance.index(size * pageNo, size, search);
      res.status(200).json(tax);
    } catch (e) {
      next(e);
    }
  };

  private create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taxServiceInstance = Container.get(TaxService);
      const tax = await taxServiceInstance.create(req.body);
      res.status(200).json(tax);
    } catch (e) {
      next(e);
    }
  };

  private update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taxServiceInstance = Container.get(TaxService);
      const tax = await taxServiceInstance.update(req.params.id, req.body);
      res.status(200).json(tax);
    } catch (e) {
      next(e);
    }
  };
}

export default TaxController;
