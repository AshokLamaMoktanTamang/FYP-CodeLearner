// initializing the instance of express router
const express = require("express");
const Router = express.Router();

// importing the controllers
const authController = require("../controllers/authController");

// making the endpoints for user
Router.post("/", authController.userLogin);

module.exports = Router;
