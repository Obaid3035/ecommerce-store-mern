import {IController} from "../interface";
import {NextFunction, Request, Response, Router} from "express";
import ProductService from "../services/ProductService";
import {Container} from "typedi";

class ProductController implements IController {
    path = "/product"
    router = Router()

    constructor() {
        this.router
            .post(`${this.path}`, this.index)
            .get(`${this.path}/:id`, this.show)
            .post(`${this.path}-few`, this.getFewProduct)
            .get(`/category`, this.getCategories)
            .get(`/colors`, this.getColors)
    }

    private getFewProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const productServiceInstance = Container.get(ProductService)
            const product = await productServiceInstance.getFewProduct(req.body);
            res.status(200).json(product);
        } catch (e) {
            next(e);
        }
    }

    private index = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const pageNo = parseInt(<string>req.query.page);
            const size = parseInt(<string>req.query.size);
            const productServiceInstance = Container.get(ProductService)
            const product = await productServiceInstance.index(size * pageNo, size, req.body);
            res.status(200).json(product);
        } catch (e) {
            next(e);
        }
    }

    private show = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const productServiceInstance = Container.get(ProductService)
            const product = await productServiceInstance.show(req.params.id);
            res.status(200).json(product);
        } catch (e) {
            next(e);
        }
    }

    private getCategories = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const productServiceInstance = Container.get(ProductService)
            const product = await productServiceInstance.getCategories();
            res.status(200).json(product);
        } catch (e) {
            next(e);
        }
    }

    private getColors = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const productServiceInstance = Container.get(ProductService)
            const product = await productServiceInstance.getColors();
            res.status(200).json(product);
        } catch (e) {
            next(e);
        }
    }

}

export default ProductController;
