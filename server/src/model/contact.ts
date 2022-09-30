import  {Schema, model} from "mongoose";
import {IContact} from "../interface";

const ContactSchema: Schema<IContact> = new Schema({
    section_1: {
        image: {
            avatar: String,
            cloudinary_id: String,
        },
        text: String,
    },
    section_2: {
        image: {
            avatar: String,
            cloudinary_id: String,
        },
        text: String,
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
});

const Contact = model<IContact>('contact', ContactSchema);

export default Contact;
