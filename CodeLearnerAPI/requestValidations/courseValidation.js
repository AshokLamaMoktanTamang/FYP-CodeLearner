const joi = require("joi");

const courseValidation = joi.object({
  courseName: joi.string().required().min(3).max(200),
  courseFile: joi.string().required().min(3),
  thumbnail: joi.string().min(3),
  courseDescription: joi.string().required().min(3),
  learningOutcome: joi.array(),
  price: joi.number().required(),
});

module.exports = courseValidation;
