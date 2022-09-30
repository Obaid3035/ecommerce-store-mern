import { Service } from "typedi";
import User from "../model/user";
import { IUser } from "../interface";
import {BadRequest, NotFound, UnAuthorized} from "../utils/errorCode";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendForgotPasswordMail } from "../utils/emailService/email";

@Service()
class UserService  {
  async authorize(token: string) {
    const decode = <any> jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      where: {
        id: decode.user._id
      }
    });
    if (!user) {
      throw new UnAuthorized("Session expired")
    }
  }

  async register(userInput: IUser) {
    await User.userExist(userInput.email);
    const user = await User.create(userInput);
    const token: string = await user.generateToken();
    await user.save();
    return {
      token,
      role: user.role,
    };
  }

  async login(userInput: IUser) {
    const user = await User.authenticate(userInput);
    const token = await user.generateToken();
    return {
      token,
      role: user.role,
    };
  }

  async forgotPassword(email: string) {
    const user = await User.findOne({email: email.toLowerCase()});
    if(!user) {
      throw new NotFound('Email not found');
    }
    const emailSent = await sendForgotPasswordMail(user);
    if (!emailSent) {
      throw new Error("An Error has occurred")
    }
    return {
      message: "You have received an email with instructions"
    }
  }


  async resetPassword(userId: string, password: string, oldPassword: string) {
    const user = await User.findById(userId);
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new BadRequest("Old Password does not match")
    }

    user.password = await bcrypt.hash(password, 10)
    await user.save();
    return {
      message: "Your password has been successfully changed"
    }
  }

}

export default UserService;
