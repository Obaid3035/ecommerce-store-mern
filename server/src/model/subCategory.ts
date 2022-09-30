import {Schema, model} from "mongoose";
import {ISubCategory} from "../interface";

const SubCategorySchema: Schema<ISubCategory> = new Schema({
    name: {
        type: String,
        required: true
    },
    parentCategory: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'parentCategory',
    },
});

SubCategorySchema.index({
    name: "text",
})

const SubCategory = model<ISubCategory>('subCategory', SubCategorySchema);

export default SubCategory;
