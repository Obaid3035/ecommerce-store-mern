import {IController} from "../../interface";
import {NextFunction, Request, Response, Router} from "express";
import auth from "../../middleware/auth";
import {UserRole} from "../../model/user";
import {Container} from "typedi";
import CmsService from "../../services/admin/CmsService";
import upload from "../../middleware/multer";

const uploadMultipleHome = upload.fields([
    {name: 'section_1_image_1', maxCount: 1},
    {name: 'section_1_image_2', maxCount: 1},
    {name: 'section_1_image_3', maxCount: 1},
    {name: 'section_2_image', maxCount: 1},
    {name: 'section_3_image', maxCount: 1},
    {name: 'section_4_image', maxCount: 1},
    {name: 'section_5_image', maxCount: 1},
    {name: 'section_6_image', maxCount: 1},
    {name: 'section_7_image_1', maxCount: 1},
    {name: 'section_7_image_2', maxCount: 1},
    {name: 'section_7_image_3', maxCount: 1},
]);

const uploadMultipleAbout = upload.fields([
    {name: 'section_1_image', maxCount: 1},
    {name: 'section_2_image', maxCount: 1},
    {name: 'section_3_image', maxCount: 1},
    {name: 'section_4_image', maxCount: 1},
    {name: 'section_5_image', maxCount: 1},
]);

const uploadMultipleContact = upload.fields([
    {name: 'section_1_image', maxCount: 1},
    {name: 'section_2_image', maxCount: 1},
])

class CmsController implements IController {
    path = "/admin/cms";
    router = Router()

    constructor() {
        this.router
            .get(`${this.path}/home`, this.showHome)
            .get(`${this.path}/footer`, this.showFooter)
            .get(`${this.path}/contact`, this.showContact)
            .get(`${this.path}/term`, this.showTerm)
            .get(`${this.path}/policy`, this.showPolicy)
            .get(`${this.path}/faq`, this.showFaq)
            .put(`${this.path}/footer`, upload.single("image"), this.updateFooter)
            .post(`${this.path}/home`, auth(UserRole.ADMIN), uploadMultipleHome, this.createHome)
            .put(`${this.path}/home`, auth(UserRole.ADMIN), uploadMultipleHome, this.updateHome)
            .put(`${this.path}/faq`, auth(UserRole.ADMIN), upload.single("image"), this.updateFaq)
            .put(`${this.path}/contact`, auth(UserRole.ADMIN), uploadMultipleContact, this.updateContact)
            .put(`${this.path}/policy`, auth(UserRole.ADMIN), upload.single("image"), this.updatePolicy)
            .put(`${this.path}/term`, auth(UserRole.ADMIN), upload.single("image"), this.updateTerm)
            .get(`${this.path}/about`, this.showAbout)
            .post(`${this.path}/about`, auth(UserRole.ADMIN), uploadMultipleAbout, this.createAbout)
            .put(`${this.path}/about`, auth(UserRole.ADMIN), uploadMultipleAbout, this.updateAbout);
    }




    private updateContact = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const cmsServiceInstance = Container.get(CmsService);
            const cms = await cmsServiceInstance.updateContact(req.body, req.files);
            res.status(200).json(cms)
        } catch (e) {
            next(e);
        }
    }


    private updateFaq = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const cmsServiceInstance = Container.get(CmsService);
            const cms = await cmsServiceInstance.updateFaq(req.body, req.file);
            res.status(200).json(cms)
        } catch (e) {
            next(e);
        }
    }

    private updatePolicy = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const cmsServiceInstance = Container.get(CmsService);
            const cms = await cmsServiceInstance.updatePolicy(req.body, req.file);
            res.status(200).json(cms)
        } catch (e) {
            next(e);
        }
    }

    private updateTerm = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const cmsServiceInstance = Container.get(CmsService);
            const cms = await cmsServiceInstance.updateTerm(req.body, req.file);
            res.status(200).json(cms)
        } catch (e) {
            next(e);
        }
    }

    private showHome = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const cmsServiceInstance = Container.get(CmsService);
            const cms = await cmsServiceInstance.showHome();
            res.status(200).json(cms)
        } catch (e) {
            next(e);
        }
    }

    private showFaq = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const cmsServiceInstance = Container.get(CmsService);
            const cms = await cmsServiceInstance.showFaq();
            res.status(200).json(cms)
        } catch (e) {
            next(e);
        }
    }

    private showPolicy = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const cmsServiceInstance = Container.get(CmsService);
            const cms = await cmsServiceInstance.showPolicy();
            res.status(200).json(cms)
        } catch (e) {
            next(e);
        }
    }

    private showTerm = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const cmsServiceInstance = Container.get(CmsService);
            const cms = await cmsServiceInstance.showTerm();
            res.status(200).json(cms)
        } catch (e) {
            next(e);
        }
    }

    private showFooter = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const cmsServiceInstance = Container.get(CmsService);
            const cms = await cmsServiceInstance.showFooter();
            res.status(200).json(cms)
        } catch (e) {
            next(e);
        }
    }

    private showContact = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const cmsServiceInstance = Container.get(CmsService);
            const cms = await cmsServiceInstance.showContact();
            res.status(200).json(cms)
        } catch (e) {
            next(e);
        }
    }

    private updateFooter = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const cmsServiceInstance = Container.get(CmsService);
            const cms = await cmsServiceInstance.updateFooter(req.body, req.file);
            res.status(200).json(cms)
        } catch (e) {
            next(e);
        }
    }

    private createHome = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const cmsServiceInstance = Container.get(CmsService);
            const cms = await cmsServiceInstance.createHome(req.body, req.files);
            res.status(200).json(cms)
        } catch (e) {
            next(e);
        }
    }

    private updateHome = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const cmsServiceInstance = Container.get(CmsService);
            const cms = await cmsServiceInstance.updateHome(req.body, req.files);
            res.status(200).json(cms)
        } catch (e) {
            next(e);
        }
    }

    private showAbout = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const cmsServiceInstance = Container.get(CmsService);
            const cms = await cmsServiceInstance.showAbout();
            res.status(200).json(cms)
        } catch (e) {
            next(e);
        }
    }

    private createAbout = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const cmsServiceInstance = Container.get(CmsService);
            const cms = await cmsServiceInstance.createAbout(req.body, req.files);
            res.status(200).json(cms)
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    private updateAbout = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const cmsServiceInstance = Container.get(CmsService);
            const cms = await cmsServiceInstance.updateAbout(req.body, req.files);
            res.status(200).json(cms)
        } catch (e) {
            next(e);
        }
    }

}

export default CmsController
