const router = require("express").Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/user"); 
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'defaultSecret';


// User registration
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message : "USERNAME_ALREADY_EXISTS" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword });
    
    return res.status(201).json({ message: 'User registered successfully', userID: newUser.id });
  } catch (err) {
    return res.status(500).json({ type: err.message });
  }
});

// User login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: "NO_USER_FOUND" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "WRONG_CREDENTIALS" });
    }

    

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token, userID: user.id });
  } catch (err) {
    return res.status(500).json({ type: err.message });
  }
});

module.exports = router

