// initializing the instance of express router
const express = require("express");
const Router = express.Router();

// importing the controllers
const userController = require("../controllers/userController");

// making the end points for user
Router.get("/", userController.fetchUser);
Router.post("/", userController.addUser);

module.exports = Router;
