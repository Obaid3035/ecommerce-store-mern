import {IController} from "../../interface";
import {NextFunction, Request, Response, Router} from "express";
import {UserRole} from "../../model/user";
import auth from "../../middleware/auth";
import {Container} from "typedi";
import EGiftService from "../../services/admin/GiftService";
import upload from "../../middleware/multer";

class EGiftController implements IController {
    path = "/admin/e-gift";
    router = Router();

    constructor() {
        this.router
            .get(`${this.path}`, auth(UserRole.ADMIN), this.index)
            .get(`${this.path}/history`, auth(UserRole.ADMIN), this.getGiftHistory)
            .post(`${this.path}`, auth(UserRole.ADMIN), upload.single("image"), this.create)
            .put(`${this.path}/:id`, auth(UserRole.ADMIN), upload.single("image"), this.update)
            .get(`${this.path}/:id`, auth(UserRole.ADMIN), this.show)
            .delete(`${this.path}/:id`, auth(UserRole.ADMIN), this.destroy);
    }

    private index = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const pageNo = parseInt(<string>req.query.page);
            const size = parseInt(<string>req.query.size);
            const giftServiceInstance = Container.get(EGiftService);
            const gift = await giftServiceInstance.index(size * pageNo, size);
            res.status(200).json(gift);
        } catch (e) {
            next(e);
        }
    };

    private getGiftHistory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const pageNo = parseInt(<string>req.query.page);
            const size = parseInt(<string>req.query.size);
            const giftServiceInstance = Container.get(EGiftService);
            const gift = await giftServiceInstance.getGiftHistory(size * pageNo, size);
            res.status(200).json(gift);
        } catch (e) {
            next(e);
        }
    };

  private update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const giftServiceInstance = Container.get(EGiftService);
      const gift = await giftServiceInstance.update(
          req.body,
          req.params.id,
          req.file);
      res.status(200).json(gift);
    } catch (e) {
      next(e);
    }
  }

  private show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const giftServiceInstance = Container.get(EGiftService);
      const gift = await giftServiceInstance.show(req.params.id);
      res.status(200).json(gift);
    } catch (e) {
      next(e);
    }
  }

    private destroy = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const giftServiceInstance = Container.get(EGiftService);
            const gift = await giftServiceInstance.destroy(req.params.id);
            res.status(200).json(gift);
        } catch (e) {
            next(e);
        }
    }

    private create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const giftServiceInstance = Container.get(EGiftService);
            const gift = await giftServiceInstance.create(req.body, req.file.path);
            res.status(200).json(gift);
        } catch (e) {
            next(e);
        }
    };

}

export default EGiftController;
