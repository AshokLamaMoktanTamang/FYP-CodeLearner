// initializing the instance of express router
const express = require("express");
const Router = express.Router();

// importing the controllers
const {
  fetchAdmin,
  updateAdminPassword,
} = require("../controllers/adminController");
const verifyUserToken = require("../middleware/verifyUserToken");

// making the endpoints for user
Router.put("/", verifyUserToken, updateAdminPassword);
Router.get("/", verifyUserToken, fetchAdmin);

module.exports = Router;
