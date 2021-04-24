const express = require('express');
const mongoose = require('mongoose');

const app = express();

require('dotenv').config();

app.use(express.json());

// Middleware
const authRoutes = require('./routes/auth');
const verifyToken = require('./routes/verifyToken');
const sessionRoutes = require('./routes/sessions');

app.get('/', (req, res) => {
  res.send('Welcome to Studio 2B 2021 Group 1 project');
});

app.get('/api/user/profile', verifyToken, (req, res) => {
  console.log(req.user);
  res.send({ success: true, data: req.user });
});

app.use('/api/users', authRoutes);

// Routes for sessions/classes
app.use('/api/sessions', sessionRoutes);

// Server port, default to 3000
const port = process.env.PORT || 3000;
const mongo_url = process.env.MONGO_URL || '';

// Check important env variables
if (!process.env.JWT_SECRET)
  console.error('!!!!ERROR!!!! PLEASE SET A JWT_SECRET IN .env.');

if (!process.env.MONGO_URL)
  console.error('NO MONGO DATABASE SET, PLEASE SET MONGO_URL IN .ENV FILE');

mongoose
  .connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  })
  .catch(err => console.log(err));
