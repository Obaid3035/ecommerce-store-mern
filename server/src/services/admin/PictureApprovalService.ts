import {Service} from "typedi";
import cloudinary from "../../utils/cloudinary";
import PictureApproval from "../../model/pictureApproval";

@Service()
class PictureApprovalService {

    async index() {
        const pictureApproval = await PictureApproval.find();
        return pictureApproval;
    }

    async create(images: any) {
        const imagePromise = [];
        for (const img of images) {
            const image = cloudinary.v2.uploader.upload(img.path);
            imagePromise.push(image)
        }

        const imagesResolved = await Promise.all(imagePromise);
        const mappedImages: any = imagesResolved.map((img) => {
            return {
                avatar: img.secure_url,
                cloudinary_id: img.public_id
            }
        });



        await PictureApproval.insertMany(mappedImages)
        return {
            message: "Picture uploaded successfully!"
        }
    }
}

export default PictureApprovalService;
