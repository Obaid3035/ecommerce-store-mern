import  {Schema, model} from "mongoose";
import {ISeo} from "../interface";

const SeoSchema: Schema<ISeo> = new Schema({

    page: {
        type: String,
        required: true
    },

    meta: {
        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        }
    },

    pageTitle: {
        type: String,
        required: true
    }

});


const Seo = model<ISeo>('seo', SeoSchema);

export default Seo;
