const express = require('express');
const core = require("cors");

const app = express();
const port = 5000;

app.use(core());
app.use (express.json());

app.get('/', (req, res) => {
    res.json({message:"API is running"})
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});