import { Service } from "typedi";
import User from "../../model/user";
import { IShoppingCost, IUser } from "../../interface";
import PictureApproval from "../../model/pictureApproval";
import ShippingCost from "../../model/shippingCost";
import {sendPasswordMail} from "../../utils/emailService/email";

function createRandomPassword(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() *
        characters.length));
  }
  return result;
}

@Service()
class UserService {

  async update(userId: string, userInput: IUser) {
    await User.findByIdAndUpdate(userId, userInput);
    return {
      message: "User updated successfully!"
    }
  }

  async delete(userId: string) {
    await User.findByIdAndDelete(userId);
    return {
      message: "User updated successfully!"
    }
  }

  async index(skip: number, limit: number) {
    const userPromise = User.find({
      isSuperAdmin: false,
      roleName: "admin"
    })
      .skip(skip)
      .limit(limit).select("name email roleName phoneNumber ability")
      .populate("role");

    const userCountPromise = User.count({
      isSuperAdmin: false,
      roleName: "admin"
    });

    const [user, userCount] = await Promise.all([
      userPromise,
      userCountPromise,
    ]);

    const formattedUser = user.map((user: any) => {
      const obj = {
        _id: user._id,
        role: user.role.title,
        name: user.name,
        phoneNumber: user.phoneNumber,
        email: user.email,
      }
      return Object.values(obj);
    });

    return {
      data: formattedUser,
      count: userCount,
    };
  }

  async show(userId: string) {
    const shop = await User.findById(userId).populate("role")
    return shop
  }

  async create(userInput: IUser) {
    userInput.password = createRandomPassword(8);
    await User.create(userInput);
    await sendPasswordMail(userInput.password, userInput.email)
    return {
      message: "User created successfully!"
    }
  }

  async getPictureApproval() {
    const images = await PictureApproval.find();
    return images
  }

  async createShippingCost(userInput: IShoppingCost) {
    await ShippingCost.create(userInput)
    return {
      message: "Shipping cost created successfully!"
    }
  }

  async showShippingCost() {
    const shippingCost = await ShippingCost.findOne();
    return shippingCost
  }

  async updateShippingCost(userInput: IShoppingCost, shippingCostID: string) {
    await ShippingCost.findByIdAndUpdate(shippingCostID, {
      price: userInput.price,
      freeLimit: userInput.freeLimit
    })
    return {
      message: "Shipping cost updated successfully!"
    }
  }
}
export default UserService;
