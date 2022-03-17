const User = require('../model/userModel');
const { deleteOne, updateOne, getOne, getAll } = require('./handlerFactory');

//get all users
const getAllUsers = getAll(User);

//get single user
const getSingleUser = getOne(User);

//update user
const updateUser = updateOne(User);

//delete user
const deleteUser = deleteOne(User);

module.exports = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
