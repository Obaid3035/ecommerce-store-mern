import { IController } from "../../interface";
import { NextFunction, Request, Response, Router } from "express";
import { Container } from "typedi";
import CouponService from "../../services/admin/CouponService";
import auth from "../../middleware/auth";
import { UserRole } from "../../model/user";

class CouponController implements IController {
  path = "/admin/coupon"
  router = Router();

  constructor() {
    this.router
      .get(`${this.path}`, this.index)
      .post(`${this.path}`, this.create)
      .get(`${this.path}/:id`, this.show)
      .put(`${this.path}/:id`, auth(UserRole.ADMIN), this.update)
      .delete(`${this.path}/:id`, this.delete);
  }

  private index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pageNo = parseInt(<string>req.query.page);
      const size = parseInt(<string>req.query.size);
      const { search } = req.query;
      const couponServiceInstance = Container.get(CouponService);
      const coupon = await couponServiceInstance.index(size * pageNo, size, search);
      res.status(200).json(coupon);
    } catch (e) {
      next(e);
    }
  };

  private create = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const couponServiceInstance = Container.get(CouponService);
      const coupon = await couponServiceInstance.create(req.body);
      res.status(200).json(coupon);
    } catch (e) {
      next(e);
    }
  };

  private show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const couponServiceInstance = Container.get(CouponService);
      const coupon = await couponServiceInstance.show(req.params.id);
      res.status(200).json(coupon);
    } catch (e) {
      next(e);
    }
  };

  private update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const couponServiceInstance = Container.get(CouponService);
      const coupon = await couponServiceInstance.update(req.params.id, (req as any).user);
      res.status(200).json(coupon);
    } catch (e) {
      next(e);
    }
  };

  private delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const couponServiceInstance = Container.get(CouponService);
      const coupon = await couponServiceInstance.delete(req.params.id);
      res.status(200).json(coupon);
    } catch (e) {
      next(e);
    }
  };
}


export default CouponController;
