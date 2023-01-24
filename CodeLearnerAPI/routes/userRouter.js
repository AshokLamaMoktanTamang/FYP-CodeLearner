// initializing the instance of express router
const express = require("express");
const Router = express.Router();
const validateRequestBody = require("../middleware/validateRequestBody");
const {
  userValidation,
  updateUserDetailValidation,
  updateUserPasswordValidation,
} = require("../requestValidations/userValidation");

// importing the controllers
const {
  addUser,
  fetchUser,
  updateUserDetail,
  updateUserPassword,
  deleteUserPermanently,
  deleteUserTemporarily,
} = require("../controllers/userController");

// importing middleware for validating header token
const verifyUserToken = require("../middleware/verifyUserToken");

// making the end points for user
Router.get("/", verifyUserToken, fetchUser);
Router.post("/", validateRequestBody(userValidation), addUser);

module.exports = Router;
