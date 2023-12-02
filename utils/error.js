export const ErrorHandler = (statusCode, message) => {
  // javascript error constructor using for manually handling error
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
