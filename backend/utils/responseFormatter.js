module.exports = {
  successResponse: (res, data, message = 'Request was successful') => {
    return res.status(200).json({
      status: 'success',
      message,
      data,
    });
  },

  errorResponse: (res, error, message = 'An error occurred') => {
    return res.status(error.status || 500).json({
      status: 'error',
      message,
      error: error.message || 'Internal Server Error',
    });
  },

  validationErrorResponse: (res, errors) => {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors,
    });
  },

  notFoundResponse: (res, message = 'Resource not found') => {
    return res.status(404).json({
      status: 'error',
      message,
    });
  },
};