import {NextFunction, Request, Response, Router} from 'express';
import {IController} from '../interface';
import {Container} from 'typedi';
import UserService from '../services/UserService';
import auth from '../middleware/auth';
import {UserRole} from '../model/user';

class UserController implements IController {
    path: string = '/auth';

    router = Router();

    constructor() {
        this.router
            .post(`${this.path}/register`, this.register)
            .post(`${this.path}/login`, this.login)
            .get(`${this.path}/authorize/:token`, this.authorize)
            .put(
                `${this.path}/reset-password`,
                auth(UserRole.ALL),
                this.resetPassword
            )
            .post(`${this.path}/reset-link`, this.forgotPassword)
    }


    private authorize = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const userServiceInstance = Container.get(UserService);
            await userServiceInstance.authorize(req.params.token);
            res.status(200).json({authenticate: true});
        } catch (e) {
            next(e);
        }
    }


    private register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const userServiceInstance = Container.get(UserService);
            const auth = await userServiceInstance.register(req.body);
            res.status(201).json(auth);
        } catch (e) {
            next(e);
        }
    };

    private login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userServiceInstance = Container.get(UserService);
            const auth = await userServiceInstance.login(req.body);
            res.status(200).json(auth);
        } catch (e) {
            next(e);
        }
    };

    private forgotPassword = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const userServiceInstance = Container.get(UserService);
            const {message} = await userServiceInstance.forgotPassword(
                req.body.email
            );
            res.status(200).json({message});
        } catch (e) {
            next(e);
        }
    };

    private resetPassword = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const {password, oldPassword} = req.body;
            const user = (req as any).user;
            const userServiceInstance = Container.get(UserService);
            const {message} = await userServiceInstance.resetPassword(
                user._id,
                password,
                oldPassword
            );
            res.status(200).json({message});
        } catch (e) {
            next(e);
        }
    };
}


export default UserController;
