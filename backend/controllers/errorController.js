const AppError = require('../utils/appError');

///function for db id error
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}!`;
  return new AppError(message, 400);
};

//function for db name duplication fields
const handleDuplicateFields = (err) => {
  const message = `Duplication filed value: ${err.keyValue.name}, please try another one`;
  return new AppError(message, 400);
};

//handleValidation error
const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const messages = errors.join('. ');
  return new AppError(messages, 400);
};

//function for jwt error
const handleJwtError = (err) => {
  return new AppError('Invalid token, please login again', 401);
};

//function for jwt expire
const handleJwtExpires = (err) => {
  return new AppError('Token got exprice, please login again', 401);
};

//function for production error
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    error: err,
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
};

//function for production
const sendErrorPro = (err, res) => {
  if (err.isOperational === true) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log('Error🔥', err);
    res.status(500).json({ status: 'error', message: 'Something went wrong' });
  }
};

//main error handler
const errorHandler = (err, req, res, next) => {
  err.status = err.status || 'Error';
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (err.name === 'CastError') error = handleCastErrorDB(error);
    if (err.code === 11000) error = handleDuplicateFields(error);
    if (err.name === 'ValidationError') error = handleValidationError(error);
    if (err.name === 'JsonWebTokenError') error = handleJwtError(error);
    if (err.name === 'TokenExpiredError') error = handleJwtExpires(error);

    sendErrorPro(error, res);
  }
};

module.exports = errorHandler;
