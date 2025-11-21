import mongoose, { Schema, Document } from "mongoose";

// ----------------------
// INTERFACES
// ----------------------
export interface ICartProduct {
  productId: mongoose.Types.ObjectId;   // only productId
}

export interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  cartProducts: ICartProduct[];
}

// ----------------------
// SCHEMA
// ----------------------
const cartSchema = new Schema<ICart>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },

    cartProducts: [
      {
        _id: false,  // <--- prevents auto-creating _id for each product item
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        }
      },
    ],
  },
  { timestamps: true }
);

// ----------------------
// MODEL EXPORT
// ----------------------
export const CartModel = mongoose.model<ICart>("Cart", cartSchema);
