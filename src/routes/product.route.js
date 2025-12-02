import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(["Iphone", "Samsung"]);
});

router.get("/one", (req, res) => {
  res.json({ name: "Iphone" });
});

router.get("/two", (req, res) => {
  res.json({ name: "Samsung" });
});

export default router;
