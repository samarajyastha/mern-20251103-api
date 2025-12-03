import productService from "../services/product.service.js";

const getProducts = (req, res) => {
  const query = req.query;

  const data = productService.getProducts(query);

  res.json(data);
};

const getProductById = (req, res) => {
  const id = req.params.id;

  const data = productService.getProductById(id);

  if (!data) return res.status(404).send("Product not found.");

  res.json(data);
};

const createProduct = (req, res) => {
  //create data
  productService.createProduct(req.body);

  res.status(201).send("Product created.");
};

export default {
  getProducts,
  getProductById,
  createProduct,
};
