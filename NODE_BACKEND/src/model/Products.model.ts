import mongoose, { Schema, Document } from "mongoose";

export enum CategoryEnum {
  Electronics = "Electronics",
  Furniture = "Furniture",
  Footwear = "Footwear",
  WomenFashion = "Women Fashion",
  MenFashion = "Men Fashion"
}

export interface IProducts extends Document {
  name: string;
  description: string;
  price: number;
  category: CategoryEnum;
  image: string;
}

const productSchema = new Schema<IProducts>({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    enum: Object.values(CategoryEnum),
    required: true,
  },

  image: {
    type: String,
    required: true,
  },
});

export const ProductModel = mongoose.model<IProducts>("Product", productSchema);
