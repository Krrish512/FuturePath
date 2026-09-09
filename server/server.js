const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

console.log("MONGODB_URI:", process.env.MONGODB_URI);

const connectDB = require("./config/database");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

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