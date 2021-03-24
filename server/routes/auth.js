const express = require('express');
const { check, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const User = require('../models/User');
const { Mongoose } = require('mongoose');

const JWT_SECRET = process.env.JWT_SECRET || 'some_secret';
if (JWT_SECRET === 'some_secret')
  console.log(
    'JWT SECRET IS NOT SECURE, PLEASE SET A SECURE SECRET IN .ENV FILE!',
  );

const registerValidation = [
  check('firstName')
    .isLength({ min: 3 })
    .withMessage('Your first name is required.'),
  check('lastName')
    .isLength({ min: 3 })
    .withMessage('Your last name is required.'),
  check('university')
    .isLength({ min: 3 })
    .withMessage('Your university name is required.'),
  check('email').isEmail().withMessage('Please provide a valid email.'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters.'),
];

const loginValidation = [
  check('email').isEmail().withMessage('Please provide a valid email.'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters.'),
];

const generateToken = user => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      fullName: `${user.firstName} ${user.lastName}`,
    },
    JWT_SECRET,
  );
};
router.post('/register', registerValidation, async (req, res) => {
  // Validation check
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // Check for users with duplicate emails
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    return res
      .status(400)
      .send({ success: false, message: 'Email already exists.' });
  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    university: req.body.university,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    const savedUser = await user.save();
    // create and assign a token to user
    const token = generateToken(savedUser);
    res.send({
      success: true,
      data: {
        id: savedUser._id,
        fullName: `${savedUser.firstName} ${savedUser.lastName}`,
        email: savedUser.email,
      },
      token,
    });
  } catch (error) {
    res.status(400).send({ success: false, error });
  }
});

router.post('/login', loginValidation, async (req, res) => {
  // Validation check
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // check if email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send({
      success: false,
      message: 'User with that email is not registered.',
    });

  // check if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    res
      .status(404)
      .send({ success: false, message: 'Invalid email or password' });

  // create and assign a token to user
  const token = generateToken(user);
  res
    .header('auth-token', token)
    .send({ success: true, message: 'Logged in successfully', token });
});

module.exports = router;
