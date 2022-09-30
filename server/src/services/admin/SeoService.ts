import {Service} from "typedi";
import Seo from "../../model/seo";
import Menu from "../../model/menu";
import cloudinary from "../../utils/cloudinary";
import BadRequest from "../../utils/errorCode";

@Service()
class SeoService {

    async show(page: string) {
        const seo = await Seo.findOne({
            page,
        });

        if (!seo) {
            return {
                isSaved: false
            }
        }

        return {
            isSaved: true,
            seo
        }
    }

    async createMenu(userInput: any, file: { path: string }) {
        const image = await cloudinary.v2.uploader.upload(file.path);

        if (!image) {
            throw new BadRequest('Logo cannot be updated');
        }
        userInput.logo = {
            avatar: image.secure_url,
            cloudinary_id: image.public_id,
        };
        await Menu.create(userInput);
        return {
            message: "Menu created successfully!"
        }
    }

    async showMenu() {
        const menu = await Menu.findOne();
        return menu
    }

    async updateMenu(menuId: string, userInput: any, file: { path: string }) {
        const menu = await Menu.findById(menuId);
        if (file) {
            if (Object.keys(menu.logo).length === 0) {
                const deletedImage = await cloudinary.v2.uploader.destroy(
                    menu.logo.cloudinary_id
                );
                if (!deletedImage) {
                    throw new BadRequest('Logo cannot be updated');
                }
            }

            const image = await cloudinary.v2.uploader.upload(file.path);

            if (!image) {
                throw new BadRequest('Logo cannot be updated');
            }
            userInput.logo = {
                avatar: image.secure_url,
                cloudinary_id: image.public_id,
            };
        } else {
            delete userInput.logo;
        }
        await Menu.findByIdAndUpdate(menuId, userInput)
        return {
            message: "Menu updated successfully!"
        }
    }

    async create(userInput: any) {
        const seo = await Seo.findOne({
            page: userInput.page,
        });

        if (!seo) {
            await Seo.create(userInput)
            return {
                message: "Seo created successfully!"
            }
        }

        await Seo.findByIdAndUpdate(seo._id, userInput)
        return {
            message: "Seo updated successfully!"
        }
    }
}

export default SeoService;
