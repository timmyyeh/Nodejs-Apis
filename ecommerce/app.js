const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const app = express();

connectDB();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json("hello world");
});

app.use("/api/register", require("./routes/register"));
app.use("/api/login", require("./routes/login"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server is running at port: ${port}`));
