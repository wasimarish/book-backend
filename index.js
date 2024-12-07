// l51mt8dliZuYk7Bh

const express = require('express');
const app = express();
const port = process.env.port || 3000;
const cors = require("cors");
const mongoose = require('mongoose');
require('dotenv').config();

// Middleware
app.use(express.json()); // Parse JSON payloads
app.use(cors({
    origin: ['http://localhost:5173', 'https://book-frontend-ruby.vercel.app'],
    credentials: true
}));

// Debugging middleware for CORS
app.use((req, res, next) => {
    console.log(`Incoming request from origin: ${req.headers.origin}`);
    next();
});

// Routes
const bookRoutes = require('./src/books/book.route');
const orderRoutes = require("./src/orders/order.route");
const userRoutes = require("./src/users/user.route");
const adminRoutes = require("./src/stats/admin.stats");

app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// MongoDB connection
async function main() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed", error);
        process.exit(1);
    }
}

main();

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
