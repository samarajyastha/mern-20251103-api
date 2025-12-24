import express from "express";

import pageController from "../controllers/page.controller.js";

const router = express.Router();

router.get("/home", pageController.homePage);

router.get("/products", pageController.productsPage);

router.get("/products/:id", pageController.productDetailsPage);

export default router;
