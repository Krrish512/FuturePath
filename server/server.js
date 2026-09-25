const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/database");
const universityRoutes = require("./routes/universityRoutes");
const courseRoutes = require("./routes/courseRoutes");
const curriculumRoutes = require("./routes/curriculumRoutes");
const qualificationRoutes = require("./routes/qualificationRoutes");
const streamRoutes = require("./routes/streamRoutes");
const pathwayRoutes = require("./routes/pathwayRoutes");
const cityRoutes = require("./routes/cityRoutes");
const institutionRoutes = require("./routes/institutionRoutes");
const careerRoutes = require("./routes/careerRoutes");
const guidanceRoutes = require("./routes/guidanceRoutes");
const authRoutes = require("./routes/authRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const reportRoutes = require("./routes/reportRoutes");

console.log("MONGODB_URI:", process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/futurepath");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/universities", universityRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/curriculum", curriculumRoutes);
app.use("/api/qualifications", qualificationRoutes);
app.use("/api/streams", streamRoutes);
app.use("/api/pathways", pathwayRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/institutions", institutionRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/guidance", guidanceRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/reports", reportRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "FuturePath Master API is running"
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