import  {Schema, model} from "mongoose";
import { IMenu } from "../interface";

const MenuSchema: Schema<IMenu> = new Schema({
    shop: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    promotion: {
        type: String,
        required: true
    },
    logo:  {
        avatar: String,
        cloudinary_id: String,
    },
}, {
    timestamps: true
});

const Menu = model<IMenu>('menu', MenuSchema);

export default Menu;
