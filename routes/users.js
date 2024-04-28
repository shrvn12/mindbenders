var express = require('express');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { validate } = require('../middlewares/validator');
const { authorize } = require('../middlewares/authorizer');
const { userModel } = require('../models/userModel');
require('dotenv').config();

var router = express.Router();

router.post("/register", validate(["name", "email", "password"]), async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await userModel.findOne({ email });
  if (userExists) {
    return res.status(409).json({ message: "User already exists" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user with hashed password
  const user = new userModel({ email, password: hashedPassword, name });

  // Save user to the database
  try {
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
);

router.post("/login", validate(['email', 'password']), authorize, async (req, res) => {
  try {
      const user = req.user;

      // Generate token
    const token = jwt.sign({ name: user.name, email: user.email, id: user._id }, process.env.USER_TOKEN_KEY, { expiresIn: '7d' });

      // Set token as cookie
      res.cookie('token', token);

      // Send success response
      res.status(200).json({ message: "Login successful" });
  } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).send({message: "Internal server error"});
  }
})

router.get('/logout',(req, res) => {
  res.clearCookie('token');
  res.sendStatus(200);
})

module.exports = router;
