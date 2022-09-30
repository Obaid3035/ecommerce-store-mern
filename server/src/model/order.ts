import  {Schema, model} from "mongoose";
import {IOrder} from "../interface";

export enum ORDER_STATUS {
  PENDING = "pending",
  IN_PROGRESS = "inProgress",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  DISPUTED = "disputed",
  DISPUTED_APPROVED = "disputed_approved",
}

const OrderSchema: Schema<IOrder> = new Schema({

  cart: [{
    _id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    avatar: {
      type: String,
      required: true
    },
    discountPrice: {
      type: Number,
      required: true
    },
    qty: {
      type: Number,
      required: true
    },
    inventory:  {
      color: {
        type: String,
      },
      size: {
        type: String,
      },
    }
  }],
  amount: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  userInfo: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    state: {
      _id: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    }
  },
  sameAsShippingAddress: {
    type: Boolean,
    required: true
  },
  billingAddress: {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
    },
    state: {
      _id: {
        type: String,
      },
      name: {
        type: String,
      }
    }
  },
  skuId: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  status: {
    type: String,
    enum: ORDER_STATUS,
    default: ORDER_STATUS.PENDING,
    required: true
  },
  disputeMessage: {
    type: String,
  }
}, {
  timestamps: true
});

OrderSchema.index({
  skuId: "text",
})


const Order = model<IOrder>('order', OrderSchema);

export default Order;
