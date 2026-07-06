const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });


userSchema.pre('save', async function () {
    console.log("Pre-save hook started");

  this.password = await bcrypt.hash(this.password, 10);
    console.log("Pre-save hook finished");

});

userSchema.methods.comparePassword = async function (typedPassword) {
  return await bcrypt.compare(typedPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
