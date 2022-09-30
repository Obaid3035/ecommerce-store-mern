import  {Schema, model} from "mongoose";
import {IAbout} from "../interface";

const AboutSchema: Schema<IAbout> = new Schema({
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

    section_3: {
        image: {
            avatar: String,
            cloudinary_id: String,
        },
        text: String,
    },

    section_4: {
        image: {
            avatar: String,
            cloudinary_id: String,
        },
        text: String,
    },
    section_5: {
        image: {
            avatar: String,
            cloudinary_id: String,
        },
        text: String,
    }
});

const About = model<IAbout>('about', AboutSchema);

export default About;
