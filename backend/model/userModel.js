const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    trim: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: { type: String, default: 'default.jpg' },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please provide confirm password'],
    minlength: 8,
    validate: {
      //this only works on Create and Save method
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password does not match!',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

//create password hashed
userSchema.pre('save', async function (next) {
  //this function will run if the pasword was actually modified
  if (!this.isModified === 'password') return next();

  //make password hashed
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(this.password, salt);

  this.password = hashedPassword;

  //remove the confirm password
  this.passwordConfirm = undefined;

  next();
});

//find user by active
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

//changed password
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

//create token
userSchema.methods.createToken = async function (id) {
  const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  return token;
};

///compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

//changed password
userSchema.methods.changedPasswordAfter = function (JWTTimestamps) {
  if (this.passwordChangedAt) {
    const changedTime = parseInt(this.passwordChangedAt.getTime() / 1000);

    return JWTTimestamps < changedTime;
  }
  return false;
};

//create createPasswordResetToken
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
