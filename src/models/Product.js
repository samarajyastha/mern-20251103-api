import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required."],
    minLength: [2, "Invalid product name."],
  },
  brand: String,
  category: String,
  price: {
    type: Number,
    required: [true, "Product price is required."],
    min: [1, "Price must be greater than 1."],
    max: [9999999, "Price must be less than 99,99,999."],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  stock: {
    type: Number,
    default: 1,
  },
  imageUrls: [String],
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Created by user is required."],
  },
  description: String,
});

const model = mongoose.model("Product", productSchema);

export default model;
