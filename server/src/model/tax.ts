import  {Schema, model} from "mongoose";
import { ITax } from "../interface";

const TaxSchema: Schema<ITax> = new Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  tax: {
    type: Number,
    required: true,
    default: 0
  }
});

TaxSchema.index({
  name: "text",
})



const Tax = model<ITax>('tax', TaxSchema);

export default Tax;
