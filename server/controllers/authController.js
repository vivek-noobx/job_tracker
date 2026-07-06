const User = require('../models/User');
const jwt = require('jsonwebtoken');
const signup = async (req, res) => {
  try {
    console.log("Body:", req.body);

    const { name, email, password } = req.body;

    console.log("Creating user");

    const newUser = new User({ name, email, password });

    console.log("Saving user");

    await newUser.save();

    console.log("Saved");

    res.send("User registered!");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
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