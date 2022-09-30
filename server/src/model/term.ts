import  {Schema, model} from "mongoose";
import {IAbout} from "../interface";

const TermSchema: Schema<IAbout> = new Schema({
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

const Term = model<IAbout>('term', TermSchema);

export default Term;
