import  {Schema, model} from "mongoose";
import {IAbout} from "../interface";

const PolicySchema: Schema<IAbout> = new Schema({
    section_1: {
        image: {
            avatar: String,
            cloudinary_id: String,
        },
        text: String,
    },
    section_2: {
        text: String,
    },
});

const Policy = model<IAbout>('policy', PolicySchema);

export default Policy;
