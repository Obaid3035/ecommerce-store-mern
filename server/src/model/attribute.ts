import mongoose, {Schema} from "mongoose";
import {IAttribute} from "../interface";

const AttributeSchema: Schema<IAttribute> = new Schema({
    name: {
        type: String,
        required: true
    },
});

AttributeSchema.index({
    name: "text",
})

const Attribute = mongoose.model<IAttribute>('attribute', AttributeSchema);

export default Attribute;
