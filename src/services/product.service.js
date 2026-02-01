import { PRODUCT_DESCRIPTION_PROMPT } from "../constants/prompt.js";
import Product from "../models/Product.js";
import promptAI from "../utils/ai.js";
import uploadFile from "../utils/fileUploader.js";

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

const createProduct = async (data, files, userId) => {
  const uploadedFiles = await uploadFile(files);

  const imageUrls = uploadedFiles.map((item) => item.url);

  const promptMessage = PRODUCT_DESCRIPTION_PROMPT.replace("%s", data.name)
    .replace("%s", data.brand)
    .replace("%s", data.category);

  const description = data.description ?? (await promptAI(promptMessage));

  return await Product.create({
    ...data,
    description,
    imageUrls,
    createdBy: userId,
  });
};

const deleteProduct = async (id) => {
  await getProductById(id);

  await Product.findByIdAndDelete(id);
};

const updateProduct = async (id, data, files) => {
  await getProductById(id);

  const updateData = data;

  if (files && files.length > 0) {
    const uploadedFiles = await uploadFile(files);

    updateData.imageUrls = uploadedFiles.map((item) => item.url);
  }

  return await Product.findByIdAndUpdate(id, updateData, { new: true });
};

const getBrands = async () => {
  return await Product.distinct("brand");
};

const getCategories = async () => {
  return await Product.distinct("category");
};

export default {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
  getBrands,
  getCategories,
};
