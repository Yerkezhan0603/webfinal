const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    material: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    img: { type: String, required: true }
});

module.exports = mongoose.model("Product", ProductSchema);
