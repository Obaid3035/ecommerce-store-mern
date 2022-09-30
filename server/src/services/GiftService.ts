import {Service} from "typedi";
import Gift from "../model/gift";
import {sendAdminGiftCardCodeMail, sendGiftCardCodeMail} from "../utils/emailService/email";
import {IUser} from "../interface";
import GiftHistory from "../model/giftHistory";
import {makeRandomId} from "../utils/helper";

@Service()
class GiftService {
    async index(skip: number, limit: number) {
        const eGiftPromise = Gift.find({
            name: {
                $ne: "Refund",
            },
            redeemed: false
        })
            .skip(skip)
            .limit(limit)
            .select("name price description");
        const eGiftCountPromise = Gift.count({
            name: {
                $ne: "Refund",
            },
            redeemed: false
        });

        const [eGift, eGiftCount] = await Promise.all([
            eGiftPromise,
            eGiftCountPromise,
        ]);
        const formattedEGift = eGift.map((gift: any) => {
            return Object.values(gift._doc);
        });

        return {
            data: formattedEGift,
            count: eGiftCount,
        };
    }

    async buyGiftCard(user: IUser, userInput: any) {
        const gift = await Gift.findById(userInput.giftId);
        let giftInput = {
            user: user._id,
            redeemed: false,
            code: makeRandomId(7)
        }
        gift.codes.push(giftInput)

        await Gift.findByIdAndUpdate(userInput.giftId, gift)

        await GiftHistory.create({
            user: user._id,
            gift: userInput.giftId,
            giftCardName: gift.name,
            giftCardPrice: gift.price,
            email: user.email
        })
        const customerGiftCardMailPromise = await sendGiftCardCodeMail(user.email, giftInput.code);
        const adminGiftCardMailPromise = await sendAdminGiftCardCodeMail(user.email)
        await Promise.all([customerGiftCardMailPromise, adminGiftCardMailPromise])
        return {
            message: "An Gift card has been send to your email"
        }
    }

}
export default GiftService;
