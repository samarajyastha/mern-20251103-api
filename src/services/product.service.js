import Product from "../models/Product.js";

const getProducts = async (query) => {
  const products = await Product.find();

  return products;
};

const getProductById = async (id) => {
  const product = await Product.findById(id);

  if (!product)
    throw {
      status: 404,
      message: "Product not found.",
    };

  return product;
};

const createProduct = async (data) => {
  return await Product.create(data);
};

const deleteProduct = async (id) => {
  await getProductById(id);

  await Product.findByIdAndDelete(id);
};

const updateProduct = async (id, data) => {
  await getProductById(id);

  return await Product.findByIdAndUpdate(id, data, { new: true });
};

export default {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
};
