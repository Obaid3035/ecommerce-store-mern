import { NextFunction, Request, Response, Router } from 'express';
import { IController } from '../../interface';
import { Container } from 'typedi';
import auth from '../../middleware/auth';
import { UserRole } from '../../model/user';
import ProductService from "../../services/admin/ProductService";
import upload from "../../middleware/multer";

const uploadMultiple = upload.fields([
  { name: 'images', maxCount: 10 },
]);


class ProductController implements IController {
  path: string = '/admin/product';

  router = Router();


  constructor() {
    this.router
      .get(`${this.path}`, auth(UserRole.ADMIN), this.index)
      .get(`${this.path}/:id`, auth(UserRole.ADMIN), this.show)
      .post(`${this.path}`, auth(UserRole.ADMIN), uploadMultiple, this.create)
      .put(`${this.path}/:id`, auth(UserRole.ADMIN), this.update)
      .delete(`${this.path}/:id`, auth(UserRole.ADMIN), this.delete)
      .post(`${this.path}/:id`, auth(UserRole.ADMIN), this.deleteImage)
      .put(`${this.path}/upload-images/:id`, auth(UserRole.ADMIN), uploadMultiple, this.uploadImages);

  }

  private deleteImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productServiceInstance = Container.get(ProductService);
      const product = await productServiceInstance.deleteImage(req.params.id, req.body);
      res.status(200).json(product);
    } catch (e) {
      next(e);
    }
  }

  private uploadImages = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productServiceInstance = Container.get(ProductService);
      const product = await productServiceInstance.uploadImages(req.params.id, (req as any).files.images)
      res.status(200).json(product);
    } catch (e) {
      next(e);
    }
  }

  private index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pageNo = parseInt(<string>req.query.page);
      const size = parseInt(<string>req.query.size);
      const { search } = req.query;
      const productServiceInstance = Container.get(ProductService);
      const product = await productServiceInstance.index(size * pageNo, size, search);
      res.status(200).json(product);
    } catch (e) {
      next(e);
    }
  };

  private create = async (req: Request, res: Response, next: NextFunction) => {
    try {
     const productServiceInstance = Container.get(ProductService);
     console.log(req.body)
      const product = await productServiceInstance.create(req.body, (req as any).files.images);
      res.status(200).json(product);
    } catch (e) {
      console.log(e);
      next(e);
    }
  };

  private show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productServiceInstance = Container.get(ProductService);
      const product = await productServiceInstance.show(req.params.id);
      res.status(200).json(product);
    } catch (e) {
      next(e);
    }
  };

  private update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productServiceInstance = Container.get(ProductService);
      const product = await productServiceInstance.update(req.params.id, req.body);
      res.status(200).json(product);
    } catch (e) {
      next(e);
    }
  };

  private delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productServiceInstance = Container.get(ProductService);
      const product = await productServiceInstance.delete(req.params.id);
      res.status(200).json(product);
    } catch (e) {
      next(e);
    }
  };
}



export default ProductController;
