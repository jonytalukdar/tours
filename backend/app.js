const express = require('express');
const morgan = require('morgan');
const connectDb = require('./db/connectDb');
require('dotenv').config();
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const errorHandler = require('./controllers/errorController.js');
const tourRoutes = require('./routes/toursRoutes');
const usersRoutes = require('./routes/usersRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();

//limiter
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 60 minutes)
  message: 'To many request with this IP, please try again after in an hour',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

//middleware
app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(limiter);
app.use(cors());

//data sanitaization against noSQL query injection
app.use(mongoSanitize());
//data sanitization against XSS
app.use(xss());
//http  HTTP Parameter Pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

//routes
app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/reviews', reviewRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(PORT, () => console.log('Server Started'));
  } catch (error) {
    console.log(error);
  }
};

startServer();
