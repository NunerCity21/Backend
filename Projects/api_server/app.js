const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/auth');
const cardRoutes = require('./routes/cards');

const app = express();

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/cards', cardRoutes);

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ errorMessage: 'Invalid token' });
  }
  res.status(500).json({ errorMessage: 'An unexpected error occurred' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
