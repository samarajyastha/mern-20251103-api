import productService from "../services/product.service.js";

const homePage = async (req, res) => {
  try {
    res.render("index", {
      title: "Techno Ecommerce",
      label: "Buy best electronic items",
    });
  } catch (error) {
    res.status(400).send(error?.message);
  }
};

const productsPage = async (req, res) => {
  try {
    const products = await productService.getProducts(req.query);

    res.render("products", { products });
  } catch (error) {
    res.status(400).send(error?.message);
  }
};

const productDetailsPage = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);

    res.render("product", { product });
  } catch (error) {
    res.status(400).send(error?.message);
  }
};

export default { homePage, productsPage, productDetailsPage };
