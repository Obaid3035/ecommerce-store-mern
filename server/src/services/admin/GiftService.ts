import {Service} from "typedi";
import Gift from "../../model/gift";
import {IGift} from "../../interface";
import cloudinary from "../../utils/cloudinary";
import BadRequest from "../../utils/errorCode";
import GiftHistory from "../../model/giftHistory";


@Service()
class EGiftController {

    async getGiftHistory(skip: number, limit: number) {
        const eGiftHistoryPromise = GiftHistory.find()
            .skip(skip)
            .limit(limit)
            .select("email giftCardName giftCardPrice");

        const eGiftHistoryCountPromise = GiftHistory.count()

        const [eGiftHistory, eGiftHistoryCount] = await Promise.all([
            eGiftHistoryPromise,
            eGiftHistoryCountPromise,
        ]);
        const formattedEGiftHistory = eGiftHistory.map((gift: any) => {
            return Object.values(gift._doc);
        });

        return {
            data: formattedEGiftHistory,
            count: eGiftHistoryCount,
        };
    }

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

    async show(giftId: string) {
        const gift = await Gift.findById(giftId);
        if (!gift) {
            throw new BadRequest("No Gift found!");
        }
        return gift;
    }

    async update(userInput: IGift, giftId: string, file: { path: string }) {
        const gift = await Gift.findById(giftId);
        if (!gift) {
            throw new BadRequest("No Gift found!");
        }

        if (file) {
            if (Object.keys(gift.image).length === 0) {
                const deletedImage = await cloudinary.v2.uploader.destroy(
                    gift.image.cloudinary_id
                );
                if (!deletedImage) {
                    throw new BadRequest('Image cannot be updated');
                }
            }

            const image = await cloudinary.v2.uploader.upload(file.path);

            if (!image) {
                throw new BadRequest('Image cannot be updated');
            }
            userInput.image = {
                avatar: image.secure_url,
                cloudinary_id: image.public_id,
            };
        } else {
            delete userInput.image;
        }

        await Gift.findByIdAndUpdate(giftId, userInput);
        return {
            message: "Profile updated successfully!"
        }
    }

    async destroy(giftId: string) {
        const gift = await Gift.findById(giftId);
        if (!gift) {
            throw new BadRequest("No Gift found!");
        }

        await cloudinary.v2.uploader.destroy(gift.image.cloudinary_id);
        await Gift.findByIdAndDelete(giftId);
        return {
            message: "Gift deleted successfully!"
        }
    }

    async create(userInput: IGift, path: string) {
        const uploadedImage = await cloudinary.v2.uploader.upload(path);
        const giftInstance: IGift = {
            name: userInput.name,
            codes: [],
            description: userInput.description,
            price: userInput.price,
            image: {
                avatar: uploadedImage.secure_url,
                cloudinary_id: uploadedImage.public_id,
            },
        };

        await Gift.create(giftInstance);
        return {
            message: "Gift created successfully!"
        }
    }

}

export default EGiftController;
