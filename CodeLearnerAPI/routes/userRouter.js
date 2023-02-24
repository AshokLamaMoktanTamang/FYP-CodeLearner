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
  updateUserProfile,
  updateUserPassword,
} = require("../controllers/userController");

// importing middleware for validating header token
const verifyUserToken = require("../middleware/verifyUserToken");
const { upload } = require("../middleware/fileUpload");

// making the end points for user
Router.get("/", verifyUserToken, fetchUser);
Router.post("/", validateRequestBody(userValidation), addUser);
Router.put(
  "/profile",
  verifyUserToken,
  upload.single("profile"),
  validateRequestBody(updateUserDetailValidation),
  updateUserProfile
);
Router.put(
  "/password",
  verifyUserToken,
  validateRequestBody(updateUserPasswordValidation),
  updateUserPassword
);

module.exports = Router;
