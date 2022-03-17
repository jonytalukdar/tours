require('dotenv').config();

const Tour = require('./model/tourModel');
const User = require('./model/userModel');
const Review = require('./model/reviewModel');

const connectDB = require('./db/connectDb');

const tourJson = require('./dev-data/data/tours.json');
const userJson = require('./dev-data/data/users.json');
const reviewsJson = require('./dev-data/data/reviews.json');

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    await Tour.deleteMany();
    await Tour.create(tourJson);

    await User.deleteMany();
    await User.create(userJson, { validateBeforeSave: false });

    await Review.deleteMany();
    await Review.create(reviewsJson);

    console.log('product added');
  } catch (error) {
    console.log(error);
  }
};

start();
