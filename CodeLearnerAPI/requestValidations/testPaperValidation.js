const joi = require("joi");

const teatPaperValidation = joi.object({
  formLabel: joi.string().required().min(3),
  description: joi.string(),
  questions: joi
    .array()
    .items({
      question: joi.string().required(),
      options: joi.array().required(),
      answerKey: joi.number().required(),
    })
    .required(),
});

module.exports = teatPaperValidation;
