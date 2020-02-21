const express = require("express");
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const router = express.Router();

router.get("/", (req, res) => res.send("register route"));

router.post("/", [check("email").isEmail()], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = new User({
      email,
      password: hashPassword
    });

    await user.save();

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
    return res.json({
      token,
      user
    });
  } catch (error) {
    return res.status(404);
  }
});

module.exports = router;
