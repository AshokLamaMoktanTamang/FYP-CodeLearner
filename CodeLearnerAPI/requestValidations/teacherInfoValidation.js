const joi = require("joi");

const teacherInfoValidation = joi.object({
  profession: joi.string().required().min(3).max(50),
  CV: joi.string().required().min(3),
  teachingType: joi.string().required().min(3).max(50),
  aboutSelf: joi.string().required().min(20),
});

module.exports = teacherInfoValidation;
