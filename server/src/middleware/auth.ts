import jwt from 'jsonwebtoken';
import User  from '../model/user';
import { NextFunction, Response, Request } from 'express';
import { IUser } from '../interface';

const auth = (role: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decode = <{ user: IUser }>jwt.verify(token, process.env.JWT_SECRET);
      const user: IUser = await User.findById(decode.user._id);
      if (!user) {
        res.status(401).send({ error: 'Please Authorize Yourself' });
        return;
      }
      if(role !== "all") {
        if (!(user.roleName === role)) {
          res.status(401).send({
            error: 'Please Authorize Yourself',
          });
          return;
        }
      }
      (<any>req).user = user;
      next();
    } catch (e) {
      res.status(401).send({ error: 'Authorize Yourself' });
    }
  };
};

export default auth;

