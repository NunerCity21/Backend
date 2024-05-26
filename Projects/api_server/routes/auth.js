const express = require('express');
const router = express.Router();
const { generateToken } = require('../utils/jwt');
const { readFile } = require('../utils/fileOperations');

router.post('/getToken', async (req, res) => {
  const { username, password } = req.body;
  const users = await readFile('./data/users.json');

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ errorMessage: 'Invalid credentials' });
  }

  const token = generateToken(user);
  res.json({ token });
});

module.exports = router;
