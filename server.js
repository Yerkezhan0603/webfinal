const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY || "cb4877be64e4b1ce96d6f248e051959094c08bd5ee14308879c1ede7a6acc5877746b481e703455531ab8d587881c45c86c663a0f4617999f44d8d8d00033b38a2eae2e4cad9d213c63c8f4e662304a9de58534831e1976006cc6b5c6cbbe9e78f3f87dd69bfa7853ecee322013fef27ed8017bfff1337a314d07eb3f36644e2635b79a5256187f42a951829cdf4c9097f81f3e4c43eae98d163487dca1818b034cb7ae9e8548a5f0130446712ceff244d5728aba365fd5dec4eeeb69310d1468d611532ba218f55998bdbb14087e3a5dacc5e120356a7d2fdd6946d719e72858cc33cdd7842cf0a443ddfda51ac40ff6d1d5e3b9008bafdbae044c5d9827876";

// Middleware
app.use(cors());
app.use(express.json()); // Позволяет серверу работать с JSON

// Раздача статических файлов (фронтенда)
app.use(express.static(path.join(__dirname, "public")));

// Если нет других маршрутов, загружаем index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Подключаем маршруты API
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

// User schema & model
const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
});

const User = mongoose.model("User", UserSchema);

// Register route
app.post("/api/register", async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = await User.create({ name, email, password: hashedPassword });
        res.json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(400).json({ error: "Email already exists" });
    }
});

// Login route
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ token, user: { name: user.name, email: user.email } });
});

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({ error: "Invalid token" });
    }
};

// Protected route example
app.get("/api/profile", authenticateToken, (req, res) => {
    res.json({ message: "Access granted", userId: req.user.userId });
});

// Обработчик 404 для API
app.use("/api", (req, res) => {
    res.status(404).json({ message: "API Route Not Found" });
});

// Подключение к MongoDB
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000
    })
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => {
        console.error("❌ Error connecting to DB:", err);
        process.exit(1);
    });

// Запуск сервера
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
