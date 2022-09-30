import {IController} from "../../interface";
import {NextFunction, Request, Response, Router} from "express";
import {Container} from "typedi";
import PictureApprovalService from "../../services/admin/PictureApprovalService";
import upload from "../../middleware/multer";
import auth from "../../middleware/auth";
import {UserRole} from "../../model/user";

const uploadMultiple = upload.fields([
    { name: 'images', maxCount: 10 },
]);

class PictureApprovalController implements IController {
    path = "/admin/picture-approval"
    router = Router()

    constructor() {
        this.router
            .get(`${this.path}`, auth(UserRole.ADMIN), this.index)
            .post(`${this.path}`, uploadMultiple, this.create)
    }

    private index = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const pictureApprovalServiceInstance = Container.get(PictureApprovalService);
            const pictureApproval = pictureApprovalServiceInstance.index()
            res.status(200).json(pictureApproval)
        } catch (e) {
            next(e);
        }
    }

    private create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const pictureApprovalServiceInstance = Container.get(PictureApprovalService);
            const pictureApproval = await pictureApprovalServiceInstance.create((req as any).files.images)
            res.status(200).json(pictureApproval)
        } catch (e) {
            next(e);
        }
    }
}

export default PictureApprovalController;
