// initializing the instance of express router
const express = require("express");
const Router = express.Router();

// importing the controllers
const {
  userLogin,
  handleUserValidation,
  adminLogin,
  seedAdmin,
  verifyOtp,
} = require("../controllers/authController");

// making the endpoints for user
Router.post("/", userLogin);
Router.get("/:token/:userId", handleUserValidation);
Router.post("/admin", adminLogin);
Router.post("/seed", seedAdmin);
Router.post("/otp", verifyOtp);

module.exports = Router;
