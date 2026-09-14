const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/database");
const courseRoutes = require("./routes/courseRoutes");

console.log("MONGODB_URI:", process.env.MONGODB_URI);

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Database
connectDB();

// Middleware for parsing JSON and URL-encoded form data
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/courses", courseRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "FuturePath API is running"
    });
});

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        service: "FuturePath API",
        status: "healthy"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});