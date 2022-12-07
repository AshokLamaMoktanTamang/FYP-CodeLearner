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
  fetchUserById,
  updateUserDetail,
  updateUserPassword,
  deleteUserPermanently,
  deleteUserTemporarily,
} = require("../controllers/userController");

// making the end points for user
Router.get("/", fetchUser);
Router.post("/", validateRequestBody(userValidation), addUser);
Router.get("/:id", fetchUserById);
Router.patch(
  "/:id",
  validateRequestBody(updateUserDetailValidation),
  updateUserDetail
);
Router.patch(
  "/update/:id",
  validateRequestBody(updateUserPasswordValidation),
  updateUserPassword
);
Router.delete("/:id", deleteUserTemporarily);
Router.delete("/delete/:id", deleteUserPermanently);

module.exports = Router;
