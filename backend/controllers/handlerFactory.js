const catchAsync = require('../utils/catchAsync');
const ApiFeatures = require('../utils/ApiFeatures');
const AppError = require('../utils/appError');

//function for delete
const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const doc = await Model.findByIdAndDelete({ _id: id });

    if (!doc) {
      return next(new AppError('Document not found with that ID', 404));
    }

    res.status(204).json({ status: 'success' });
  });

//function for update
const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const doc = await Model.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (!doc) {
      return next(new AppError('document not found with that ID', 404));
    }

    res.status(200).json({ status: 'success', data: doc });
  });

//function for create
const createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({ status: 'success', data: doc });
  });

//get single document
const getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('Document not found with that ID', 404));
    }

    res.status(200).json({ status: 'success', data: doc });
  });

//get all documents
const getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    //to allow filter reviews of all tours
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    const features = new ApiFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    //execute query
    const docs = await features.query;

    //send requests
    res
      .status(200)
      .json({ status: 'success', nbHits: docs.length, data: docs });
  });

module.exports = { deleteOne, updateOne, createOne, getOne, getAll };
