import  {Schema, model} from "mongoose";
import {IFooter} from "../interface";

const FooterSchema: Schema<IFooter> = new Schema({
    image: {
        avatar: String,
        cloudinary_id: String,
    },
    text: {
        type: String,
        required: true
    }

});

const Footer = model<IFooter>('footer', FooterSchema);

export default Footer;
