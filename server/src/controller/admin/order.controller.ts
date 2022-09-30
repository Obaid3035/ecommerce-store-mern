import {IController} from "../../interface";
import {NextFunction, Request, Response, Router} from "express";
import auth from "../../middleware/auth";
import {UserRole} from "../../model/user";
import {Container} from "typedi";
import OrderService from "../../services/admin/OrderService";

class OrderController implements IController {
    path = "/admin/orders"
    router = Router();

    constructor() {
        this.router
            .get(`${this.path}`, auth(UserRole.ADMIN), this.index)
            .get(`${this.path}/pending`, auth(UserRole.ADMIN), this.pendingOrder)
            .get(`${this.path}/in-progress`, auth(UserRole.ADMIN), this.inProgressOrder)
            .get(`${this.path}/completed`, auth(UserRole.ADMIN), this.completedOrder)
            .get(`${this.path}/cancelled`, auth(UserRole.ADMIN), this.cancelledOrder)
            .put(`${this.path}/dispute/approved/:id`, auth(UserRole.ADMIN), this.toApprovedDispute)
            .get(`${this.path}/dispute`, auth(UserRole.ADMIN), this.disputedOrder)
            .get(`${this.path}/dispute/approved`, auth(UserRole.ADMIN), this.approvedDisputedOrder)
            .get(`${this.path}/:id`, auth(UserRole.ALL), this.show)
            .put(`${this.path}/in-progress/:id`, auth(UserRole.ADMIN), this.toInProgressOrder)
            .put(`${this.path}/completed/:id`, auth(UserRole.ADMIN), this.toCompletedOrder)
            .put(`${this.path}/cancelled/:id`, auth(UserRole.ADMIN), this.toCancelledOrder)
            .get(`${this.path}/sales/monthly`, auth(UserRole.ADMIN), this.monthlyOrder)
            .get(`${this.path}/sales/yearly`, auth(UserRole.ADMIN), this.yearlyOrder)

    }


    private yearlyOrder = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const orderServiceInstance = Container.get(OrderService)
            const order = await orderServiceInstance.yearlyOrder();
            res.status(200).json(order);
        } catch (e) {
            next(e);
        }
    }

    private monthlyOrder = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const orderServiceInstance = Container.get(OrderService)
            const order = await orderServiceInstance.monthlyOrder();
            res.status(200).json(order);
        } catch (e) {
            next(e);
        }
    }

    private show = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orderServiceInstance = Container.get(OrderService)
            const order = await orderServiceInstance.show(req.params.id);
            res.status(200).json(order);
        } catch (e) {
            next(e);
        }
    }

    private index = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const pageNo = parseInt(<string>req.query.page);
            const size = parseInt(<string>req.query.size);
            const { search } = req.query;
            const orderServiceInstance = Container.get(OrderService)
            const order = await orderServiceInstance.index(size * pageNo, size, search);
            res.status(200).json(order);
        } catch (e) {
            next(e);
        }
    }


    private disputedOrder = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const pageNo = parseInt(<string>req.query.page);
            const size = parseInt(<string>req.query.size);
            const { search } = req.query;
            const orderServiceInstance = Container.get(OrderService)
            const order = await orderServiceInstance.disputedOrder(size * pageNo, size, search);
            res.status(200).json(order);
        } catch (e) {
            next(e);
        }
    }

    private approvedDisputedOrder = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const pageNo = parseInt(<string>req.query.page);
            const size = parseInt(<string>req.query.size);
            const { search } = req.query;
            const orderServiceInstance = Container.get(OrderService)
            const order = await orderServiceInstance.approvedDisputedOrder(size * pageNo, size, search);
            res.status(200).json(order);
        } catch (e) {
            next(e);
        }
    }

    private pendingOrder = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const pageNo = parseInt(<string>req.query.page);
            const size = parseInt(<string>req.query.size);
            const { search } = req.query;
            const orderServiceInstance = Container.get(OrderService)
            const order = await orderServiceInstance.pendingOrder(size * pageNo, size, search);
            res.status(200).json(order);
        } catch (e) {
            next(e);
        }
    }

    private inProgressOrder = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const pageNo = parseInt(<string>req.query.page);
            const size = parseInt(<string>req.query.size);
            const { search } = req.query;
            const orderServiceInstance = Container.get(OrderService)
            const order = await orderServiceInstance.inProgressOrder(size * pageNo, size, search);
            res.status(200).json(order);
        } catch (e) {
            next(e);
        }
    }


    private completedOrder = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const pageNo = parseInt(<string>req.query.page);
            const size = parseInt(<string>req.query.size);
            const { search } = req.query;
            const orderServiceInstance = Container.get(OrderService)
            const order = await orderServiceInstance.completedOrder(size * pageNo, size, search);
            res.status(200).json(order);
        } catch (e) {
            next(e);
        }
    }

    private cancelledOrder = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const pageNo = parseInt(<string>req.query.page);
            const size = parseInt(<string>req.query.size);
            const { search } = req.query;
            const orderServiceInstance = Container.get(OrderService)
            const order = await orderServiceInstance.cancelledOrder(size * pageNo, size, search);
            res.status(200).json(order);
        } catch (e) {
            next(e);
        }
    }


    private toInProgressOrder = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orderServiceInstance = Container.get(OrderService)
            const order = await orderServiceInstance.toInProgressOrder(req.params.id);
            res.status(200).json(order);
        } catch (e) {
            next(e);
        }
    }


    private toApprovedDispute = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orderServiceInstance = Container.get(OrderService)
            const order = await orderServiceInstance.toDisputedApprovedOrder(req.params.id);
            res.status(200).json(order);
        } catch (e) {
            next(e);
        }
    }


    private toCompletedOrder = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orderServiceInstance = Container.get(OrderService)
            const order = await orderServiceInstance.toCompletedOrder(req.params.id);
            res.status(200).json(order);
        } catch (e) {
            next(e);
        }
    }

    private toCancelledOrder = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orderServiceInstance = Container.get(OrderService)
            const order = await orderServiceInstance.toCancelledOrder(req.params.id);
            res.status(200).json(order);
        } catch (e) {
            next(e);
        }
    }
}

export default OrderController;
