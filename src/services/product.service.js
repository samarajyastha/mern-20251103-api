import Product from "../models/Product.js";

const getProducts = async (query) => {
  const { category, brand, name, min, max, limit, offset, createdBy } = query;

  const sort = query.sort ? JSON.parse(query.sort) : {};
  const filters = {};

  if (category) filters.category = category; // Exact match
  if (brand) filters.brand = { $in: brand.split(",") }; // Match data from list of items
  if (name) filters.name = { $regex: name, $options: "i" }; // Ilike match
  if (min) filters.price = { $gte: min };
  if (max) filters.price = { ...filters.price, $lte: max };
  if (createdBy) filters.createdBy = createdBy; 

  const products = await Product.find(filters)
    .sort(sort)
    .limit(limit)
    .skip(offset);

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

const createProduct = async (data, userId) => {
  return await Product.create({ ...data, createdBy: userId });
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
