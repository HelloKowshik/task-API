const { CustomAPIError } = require('../error/custom-error');

const errorHandlerMiddlewire = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res
    .status(500)
    .json({ msg: 'Something went wrong, please try later.' });
};

module.exports = errorHandlerMiddlewire;
