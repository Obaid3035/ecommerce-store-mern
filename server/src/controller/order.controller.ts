import {IController} from "../interface";
import {NextFunction, Request, Response, Router} from "express";
import auth from "../middleware/auth";
import {UserRole} from "../model/user";
import {Container} from "typedi";
import OrderService from "../services/OrderService";

class OrderController implements IController {
    path = "/customer/order"
    router = Router()

    constructor() {
        this.router
            .post(`${this.path}`, this.create)
            .post(`${this.path}/payment-intent`, this.createPaymentIntent)
            .get(`${this.path}/gift/:id`, this.getGiftByCode)
            .get(`${this.path}/coupon/:id`, this.getCouponByCode)
            .get(`${this.path}/tax`, this.getTaxOption)
            .get(`${this.path}`, auth(UserRole.CUSTOMER), this.index)
            .get(`${this.path}/shipping`, auth(UserRole.CUSTOMER), this.getShippingAddress)
            .put(`${this.path}/dispute/:id`, auth(UserRole.CUSTOMER), this.toDisputed)
            .get(`${this.path}/cost/:id`, this.getCostDetails)
            .post(`${this.path}/shipping`, auth(UserRole.CUSTOMER), this.createShippingAddress);
    }

    private index = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const pageNo = parseInt(<string>req.query.page);
            const size = parseInt(<string>req.query.size);
            const orderServiceInstance = Container.get(OrderService);
            const order = await orderServiceInstance.index(size * pageNo, size, (req as any).user);
            res.status(200).json(order)
        } catch (e) {
            next(e);
        }
    }

    private createPaymentIntent = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orderServiceInstance = Container.get(OrderService);
            const { paymentIntentId, secret } = await orderServiceInstance.createPaymentIntent(req.body)
            res.status(200).json({
                paymentIntentId,
                secret
            })
        } catch (e) {
            next(e);
        }
    }

    private toDisputed = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orderServiceInstance = Container.get(OrderService);
            const order = await orderServiceInstance.toDisputed(req.params.id, req.body);
            res.status(200).json(order)
        } catch (e) {
            next(e);
        }
    }

  private getGiftByCode = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const orderServiceInstance = Container.get(OrderService);
        const gift = await orderServiceInstance.getGiftByCode(req.params.id);
        res.status(200).json(gift)
      } catch (e) {
        next(e);
      }
  }

    private getCouponByCode = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orderServiceInstance = Container.get(OrderService);
            const coupon = await orderServiceInstance.getCouponByCode(req.params.id);
            res.status(200).json(coupon)
        } catch (e) {
            next(e);
        }
    }

    private getTaxOption = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const orderServiceInstance = Container.get(OrderService);
            const tax = await orderServiceInstance.getTaxOption();
            res.status(200).json(tax)
        } catch (e) {
            next(e);
        }
    }

    private create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orderServiceInstance = Container.get(OrderService);
            const order = await orderServiceInstance.create(req.body);
            res.status(200).json(order)
        } catch (e) {
            next(e);
        }
    }

    private createShippingAddress = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orderServiceInstance = Container.get(OrderService);
            const user = (req as any).user;
            const order = await orderServiceInstance.createShippingAddress(req.body, user);
            res.status(200).json(order)
        } catch (e) {
            next(e);
        }
    }

    private getShippingAddress = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orderServiceInstance = Container.get(OrderService);
            const user = (req as any).user;
            const order = await orderServiceInstance.getShippingAddress(user);
            res.status(200).json(order)
        } catch (e) {
            next(e);
        }
    }


    private getCostDetails = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orderServiceInstance = Container.get(OrderService);
            const order = await orderServiceInstance.getCostDetails(req.params.id);
            res.status(200).json(order)
        } catch (e) {
            next(e);
        }
    }

}

export default OrderController;
