const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

// Create a Product
router.get("/", async (req, res) => {
  try {
      const products = await Product.find(); // Загружаем все товары
      res.json(products); // Отправляем JSON
  } catch (err) {
      console.error("❌ Ошибка при получении товаров:", err);
      res.status(500).json({ message: "Ошибка сервера" });
  }
});

module.exports = router;

// Get All Products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.use("*", (req, res) => {
  res.status(404).json({ message: "Product API Route Not Found" });
});


// Get Product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a Product
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a Product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
