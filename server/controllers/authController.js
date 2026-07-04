const User = require('../models/User');
const jwt = require('jsonwebtoken');
const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new User({ name, email, password });
  await newUser.save();
  res.send('User registered!');
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send('User not found');
  }
  const isMatch = await user.comparePassword(password);
  if (isMatch) {
   const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({ message: 'Login successful!', token });
  } else {
    res.status(401).send('Wrong password');
  }
};

module.exports = { signup, login };