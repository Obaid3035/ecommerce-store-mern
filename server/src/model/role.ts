import mongoose, { Schema } from "mongoose";
import { IRole } from "../interface";

const RoleSchema: Schema<IRole> = new Schema({
  title: {
    type: String,
  },
  ability: {
    profile: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Boolean,
      default: false,
    },
    coupon: {
      type: Boolean,
      default: false,
    },
    shippingCost: {
      type: Boolean,
      default: false,
    },
    taxes: {
      type: Boolean,
      default: false,
    },
    products: {
      type: Boolean,
      default: false,
    },
    categories: {
      type: Boolean,
      default: false,
    },
    attributes: {
      type: Boolean,
      default: false,
    },
    pictureApproval: {
      type: Boolean,
      default: false,
    },
    reviewApproval: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Boolean,
      default: false,
    },
    role: {
      type: Boolean,
      default: false,
    },
    parentCategory: {
      type: Boolean,
      default: false,
    },
    colors: {
      type: Boolean,
      default: false,
    },
    giftCard: {
      type: Boolean,
      default: false,
    },
    giftCardHistory: {
      type: Boolean,
      default: false,
    },
    editPage: {
      type: Boolean,
      default: false,
    },
    seo: {
      type: Boolean,
      default: false,
    },
    editMenu: {
      type: Boolean,
      default: false,
    },
    graph: {
      type: Boolean,
      default: false,
    }
  },
});

const Role = mongoose.model<IRole>('role', RoleSchema);

export default Role;
