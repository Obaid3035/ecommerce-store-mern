import  {Schema, model} from "mongoose";
import {IShoppingCost} from "../interface";

const ShippingCostSchema: Schema<IShoppingCost> = new Schema({
  price: {
    type: Number,
    required: true
  },
  freeLimit: {
    type: Number,
    required: true
  }
});

const ShippingCost = model<IShoppingCost>('shippingCost', ShippingCostSchema);

export default ShippingCost;
