const express = require("express");
const connectDB = require('./config/db');
const app = express();

connectDB();

app.get("/", (req, res) => {
    res.json("hello world");
});

app.use('/api/register', require('./routes/register'));

const port = process.env.PORT || 3000;
app.listen(port, () =>
    console.log(`server is running at port: ${port}`)
);