// request validation function
const validateRequestBody = (requestValidations) => (req, res, next) => {
  const value = requestValidations.validate(req.body, { abortEarly: false });
  const { error } = value;

  if (error) {
    return res.status(422).json({
      msg: "Please pass the valid data.",
      error: error.details,
    });
  }
  req.body = value.value; // Allows the default values assigned in Joi schema to be accepted
  return next();
};

module.exports = validateRequestBody;
