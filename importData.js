const mongoose = require("mongoose");
const Product = require("./models/Product");
const fs = require("fs");
require("dotenv").config();


const importData = async () => {
    try {
        const data = JSON.parse(fs.readFileSync("jewelry.json", "utf-8"));

        // Проверяем формат JSON
        const items = data.items || data.articles || data;
        if (!Array.isArray(items)) throw new Error("❌ Неверный формат JSON");

        // Очищаем базу перед импортом
        await Product.deleteMany();
        console.log("🗑 Старая база очищена");

        // Фильтруем товары без цены
        const filteredItems = items.filter(item => item.price !== undefined && item.price !== null);

        // Если после фильтрации нет товаров, сообщаем об ошибке
        if (filteredItems.length === 0) {
            throw new Error("❌ Нет товаров с ценой. Проверь JSON.");
        }

        // Добавляем товары в базу
        await Product.insertMany(filteredItems);
        console.log(`✅ Загружено ${filteredItems.length} товаров!`);

        mongoose.connection.close();
    } catch (err) {
        console.error("❌ Ошибка при загрузке данных:", err);
        mongoose.connection.close();
    }
};

// Запускаем импорт
importData();
