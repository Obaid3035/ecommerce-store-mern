import { NextFunction, Request, Response, Router } from 'express';
import { IController, IUser } from '../../interface';
import { Container } from 'typedi';
import auth from '../../middleware/auth';
import { UserRole } from '../../model/user';
import ProfileService from '../../services/admin/ProfileService';
import upload from "../../middleware/multer";


class ProfileController implements IController {
   path: string = '/profile';

   router = Router();

   constructor() {
      this.router
        .get(`${this.path}`, auth(UserRole.ALL), this.show)
        .put(`${this.path}`, auth(UserRole.ALL), upload.single("profilePicture"), this.update);
   }

   private show = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const profileServiceInstance = Container.get(ProfileService);
         const profile = await profileServiceInstance.show((req as any).user._id);
         res.status(200).json(profile);
      } catch (e) {
         next(e);
      }
   };

   private update = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const currUser: IUser = (req as any).user;
         const profileServiceInstance = Container.get(ProfileService);
         const profile = await profileServiceInstance.update(
           req.body,
           currUser,
           req.file
         );
         res.status(200).json(profile);
      } catch (e) {
         next(e);
      }
   };
}


export default ProfileController;
