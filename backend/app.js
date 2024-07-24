const express = require("express");
const app = express();
const cors = require('cors');
const PORT = 5000;
const data = require('./products.json');
app.use(cors());
app.get('/products', (req, res) => {
    res.json(data);
})

app.listen(PORT, () => {
    console.log("server is working");
})