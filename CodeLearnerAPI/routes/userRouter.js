// initializing the instance of express router
const express = require("express");
const Router = express.Router();
const validateRequestBody = require("../middleware/validateRequestBody");
const {userValidation, updateUserDetail, updateUserPassword} = require("../requestValidations/userValidation");

// importing the controllers
const userController = require("../controllers/userController");

// making the end points for user
Router.get("/", userController.fetchUser);
Router.post("/", validateRequestBody(userValidation), userController.addUser);
Router.get("/:id", userController.fetchUserById);
Router.patch("/:id", validateRequestBody(updateUserDetail), userController.updateUserDetail);
Router.patch("/update/:id", validateRequestBody(updateUserPassword), userController.updateUserPassword);
Router.delete("/:id", userController.deleteUserTemporarily);
Router.delete("/delete/:id", userController.deleteUserPermanently);

module.exports = Router;
