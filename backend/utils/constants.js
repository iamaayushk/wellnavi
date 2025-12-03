module.exports = {
  API_BASE_URL: 'http://localhost:5000/api',
  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
  },
  ERROR_MESSAGES: {
    SYMPTOM_NOT_FOUND: 'Symptom not found.',
    ANALYSIS_FAILED: 'Failed to analyze symptoms. Please try again later.',
    INVALID_INPUT: 'Invalid input provided.',
    DATABASE_ERROR: 'Database error occurred.',
  },
  SUCCESS_MESSAGES: {
    SYMPTOM_ADDED: 'Symptom added successfully.',
    ANALYSIS_SUCCESS: 'Symptoms analyzed successfully.',
  },
};