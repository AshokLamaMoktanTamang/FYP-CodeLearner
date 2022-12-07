// initializing the instance of express router
const express = require("express");
const Router = express.Router();

// importing the controllers
const {userLogin, handleUserValidation} = require("../controllers/authController");

// making the endpoints for user
Router.post("/", userLogin);
Router.get("/:token/:userId", handleUserValidation);

module.exports = Router;
