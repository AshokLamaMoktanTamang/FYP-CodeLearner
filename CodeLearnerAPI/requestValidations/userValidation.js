const joi = require("joi");

const userValidation = joi.object({
  firstName: joi.string().required().min(3).max(50),
  lastName: joi.string().required().min(3).max(50),
  email: joi.string().required().email().lowercase(),
  password: joi.string().required().min(8).alphanum(),
});

const updateUserDetailValidation = joi.object({
  firstName: joi.string().required().min(3).max(50),
  lastName: joi.string().required().min(3).max(50),
  profilePic: joi.string(),
  currentPassword: joi.string().required().min(8),
});

const updateUserPasswordValidation = joi.object({
  currentPassword: joi.string().required().min(8),
  password: joi.string().required().min(8).alphanum(),
});

module.exports = {
  userValidation,
  updateUserDetailValidation,
  updateUserPasswordValidation,
};
