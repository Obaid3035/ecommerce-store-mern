import {Schema, model} from "mongoose";
import {IColor} from "../interface";

const ColorSchema: Schema<IColor> = new Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  }
});

const Color = model<IColor>('color', ColorSchema);

export default Color;
