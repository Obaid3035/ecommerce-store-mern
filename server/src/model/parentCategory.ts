import {Schema, model} from "mongoose";
import {IParentCategory} from "../interface";

const ParentCategorySchema: Schema<IParentCategory> = new Schema({
    name: {
        type: String,
        required: true
    },
    subCategory: [
        {
            type: Schema.Types.ObjectId,
            ref: 'subCategory',
        },
    ],
});

ParentCategorySchema.index({
    name: "text",
})

const ParentCategory = model<IParentCategory>('parentCategory', ParentCategorySchema);

export default ParentCategory;
