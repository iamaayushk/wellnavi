const { body, validationResult } = require('express-validator');

const validateSymptomInput = [
  body('symptoms')
    .isArray()
    .withMessage('Symptoms must be an array of strings.')
    .notEmpty()
    .withMessage('Symptoms array cannot be empty.'),
  body('symptoms.*')
    .isString()
    .withMessage('Each symptom must be a string.'),
];

const validateAnalysisRequest = [
  body('symptoms')
    .isString()
    .withMessage('Symptoms must be a string.')
    .notEmpty()
    .withMessage('Symptoms cannot be empty.'),
];

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateSymptomInput,
  validateAnalysisRequest,
  validateRequest,
};