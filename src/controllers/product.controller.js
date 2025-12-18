import productService from "../services/product.service.js";

const getProducts = async (req, res) => {
  const query = req.query;

  const data = await productService.getProducts(query);

  res.json(data);
};

const getProductById = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await productService.getProductById(id);

    res.json(data);
  } catch (error) {
    res.status(error.status || 400).send(error.message);
  }
};

const createProduct = async (req, res) => {
  try {
    const createdProduct = await productService.createProduct(
      req.body,
      req.files,
      req.user._id
    );

    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).send(error?.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id);

    res.json({ message: "Product deleted successfully.", id: req.params.id });
  } catch (error) {
    res.status(error.status || 400).send(error?.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await productService.updateProduct(
      req.params.id,
      req.body,
      req.files
    );

    res.status(201).json(updatedProduct);
  } catch (error) {
    res.status(error.status || 400).send(error?.message);
  }
};

export default {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
};
