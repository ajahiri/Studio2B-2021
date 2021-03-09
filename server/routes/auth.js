const express = require("express");
const { check, validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("../models/User");
const { Mongoose } = require("mongoose");

const registerValidation = [
  check("fullName")
    .isLength({ min: 2 })
    .withMessage("Your full name is required."),
  check("email").isEmail().withMessage("Please provide a valid email."),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters."),
];

const loginValidation = [
  check("email").isEmail().withMessage("Please provide a valid email."),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters."),
];
router.post("/register", registerValidation, async (req, res) => {
  // Validation check
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // Check for users with duplicate emails
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    return res.status(400).send("Email already exists.");
  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    const savedUser = await user.save();
    res.send({
      id: savedUser._id,
      fullName: savedUser.fullName,
      email: savedUser.email,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", loginValidation, async (req, res) => {
  // Validation check
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // check if email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send("User with that email is not registered.");

  // check if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) res.status(404).send("Invalid email or password");

  // create and assign a token to user
  const token = jwt.sign(
    { _id: user._id, email: user.email },
    "SUPERSECRETKEY"
  );
  res
    .header("auth-token", token)
    .send({ message: "Logged in successfully", token });
});

module.exports = router;
