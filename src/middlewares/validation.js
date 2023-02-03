function generateValidationMiddleware(joiSchema, validateProperty = 'body') {
  return async function (req, res, next) {
    try {
      const value = await joiSchema.validateAsync(req[validateProperty]);
      req[validateProperty] = value;
      next();
    } catch(err) {
      next(err);
    }
  };
}
  
module.exports = {
  generateValidationMiddleware,
};
  