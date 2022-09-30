import  {Schema, model} from "mongoose";
import {IHome} from "../interface";

const HomeSchema: Schema<IHome> = new Schema({
    section_1: {
        slider_1:  {
            image: {
                avatar: String,
                cloudinary_id: String,
            },
            text: String
        },
        slider_2:  {
            image: {
                avatar: String,
                cloudinary_id: String,
            },
            text: String
        },
        slider_3:  {
            image: {
                avatar: String,
                cloudinary_id: String,
            },
            text: String
        },
    },
    section_2: {
        image: {
            avatar: String,
            cloudinary_id: String,
        },
    },

    section_3: {
        image: {
            avatar: String,
            cloudinary_id: String,
        },
        heading: String,
        text: String
    },

    section_4: {
        image: {
            avatar: String,
            cloudinary_id: String,
        },
        heading: String,
        text: String

    },
    section_5: {
        image: {
            avatar: String,
            cloudinary_id: String,
        },
        heading: String,
        text: String
    },
    section_6: {
        image: {
            avatar: String,
            cloudinary_id: String,
        },
        text: String
    },

    section_7: {
        title: String,
        box_1_image: {
            avatar: String,
            cloudinary_id: String,
        },
        box_2_image: {
            avatar: String,
            cloudinary_id: String,
        },
        box_3_image: {
            avatar: String,
            cloudinary_id: String,
        }
    },
});

const Home = model<IHome>('home', HomeSchema);

export default Home;
