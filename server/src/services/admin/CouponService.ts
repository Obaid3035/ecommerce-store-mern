import { Service } from "typedi";
import Coupon from "../../model/coupon";
import BadRequest from "../../utils/errorCode";
import { ICoupon, IUser } from "../../interface";
import {formatAMPM} from "../../utils/helper";

@Service()
class CouponService {
  async index(skip: number, limit: number, search: any) {

    let couponPromise;
    couponPromise = Coupon.aggregate([
      {
        $project: {
          name: 1,
          code: 1,
          discountPrice: 1,
          count: 1,
          limit: 1,
          expiryDate: 1,
          redeemed: 1,
        }
      },
      {
        $skip: skip
      },
      {
        $limit: limit
      }
    ])

    if (search) {
      couponPromise = Coupon.aggregate([
        {
          $match: {
            $text: {
              $search: search
            },
          }
        },
        {
          $project: {
            name: 1,
            code: 1,
            discountPrice: 1,
            count: 1,
            limit: 1,
            expiryDate: 1,
            redeemed: 1,
          }
        },
        {
          $skip: skip
        },
        {
          $limit: limit
        }
      ])
    }
    const couponCountPromise = Coupon.count();
    const [coupon, couponCount] = await Promise.all([
      couponPromise,
      couponCountPromise,
    ]);
    const formattedCoupons = coupon.map((coupon: any) => {
      let obj = {
        _id: coupon._id,
        name: coupon.name,
        code: coupon.code,
        discountPrice: coupon.discountPrice,
        limit: coupon.limit,
        count: coupon.count,
        remaining: coupon.limit - coupon.count,
        expiryDate: formatAMPM(coupon.expiryDate),
      }
      return Object.values(obj);
    });

    return {
      data: formattedCoupons,
      count: couponCount,
    };
  }

  async create(userInput: ICoupon) {
    await Coupon.create(userInput);
    return {
      message: "Coupon created successfully!"
    }
  }

  async show(couponId: string) {
    const coupon = await Coupon.findById(couponId);
    if (!coupon) {
      throw new BadRequest("Coupon not found!")
    }
    return coupon
  }

  async update(couponId: string, currUser: IUser) {
    const coupon = await Coupon.findById(couponId);
    if (!coupon) {
      throw new BadRequest("Coupon not found!")
    }
    if (coupon.redeemed) {
      throw new BadRequest("Coupon is expired");
    }
    if (coupon.count >= coupon.limit) {
      await Coupon.findByIdAndUpdate(couponId, {
        redeemed: true,
        expiryDate: new Date()
      });
      throw new BadRequest("Coupon is expired");
    }

    if (new Date() > new Date(coupon.expiryDate)) {
      await Coupon.findByIdAndUpdate(couponId, {
        redeemed: true,
        expiryDate: new Date()
      });

      throw new BadRequest("Coupon is expired");
    }


    if (coupon.usedBy && coupon.usedBy.length > 0) {
      const foundIndex = coupon.usedBy.findIndex((usedBy) => {
        return usedBy.user.toString() === currUser._id.toString()
      })

      if (foundIndex >= 0) {
        coupon.usedBy[foundIndex] = {
          user: currUser._id,
          count: coupon.usedBy[foundIndex].count + 1
        }
      }
    } else {
      coupon.usedBy.push({
        count: 0,
        user: currUser._id
      })
    }

    coupon.count += 1
   await Coupon.findByIdAndUpdate(couponId, coupon);
    return {
      message: "Coupon updated successfully!"
    }
  }

  async delete(couponId: string) {
    const coupon = await Coupon.findById(couponId);
    if (!coupon) {
      throw new BadRequest("Coupon not found!")
    }
    await Coupon.findByIdAndDelete(couponId)
    return {
      message: "Coupon deleted successfully!"
    }
  }

}

export default CouponService;
