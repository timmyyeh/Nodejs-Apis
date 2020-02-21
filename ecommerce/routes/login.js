const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bycrpt = require("bcryptjs");
const express = require("express");
const config = require("config");

const router = express.Router();

router.get("/", async (req, res) => res.send("login route"));

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ errors: "user not fond" });
  }

  console.log(`user: ${user.password}`);
  const result = await bycrpt.compare(password, user.password);
  console.log(`result: ${result}`);
  const token = jwt.sign(
    {
      data: {
        user: email
      }
    },
    config.get("secret"),
    {
      expiresIn: "1h",
      algorithm: "HS256"
    }
  );

  return res.json({ token });
});

module.exports = router;
