import  {Schema, model} from "mongoose";
import {IFaq} from "../interface";

const FaqSchema: Schema<IFaq> = new Schema({
    section_1: {
        image: {
            avatar: String,
            cloudinary_id: String,
        },
        text: String,
    },
    section_2: {
        queries: [
            {
                question: {
                    type: String,
                },
                answer: {
                    type: String,
                }
            }
        ],
        text: String,
    },
});

const Faq = model<IFaq>('faq', FaqSchema);

export default Faq;


