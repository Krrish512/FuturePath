const express = require('express');
const core = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/database");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;


app.use(core());
app.use (express.json());

connectDB();

app.get('/', (req, res) => {
    res.json({
        success:true,
        message:"API is running"})
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});