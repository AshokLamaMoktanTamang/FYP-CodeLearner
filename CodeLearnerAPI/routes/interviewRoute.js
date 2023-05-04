// initializing the instance of express router
const express = require("express"),
  Router = express.Router();

// importing the controllers
const {
    fetchInterview, fetchInterviewByToken
} = require("../controllers/interviewController");

// importing middleware for validating header token and file upload
const verifyUserToken = require("../middleware/verifyUserToken");

// making the end points for user
Router.get("/all", verifyUserToken, fetchInterview);
Router.get("/", verifyUserToken, fetchInterviewByToken);

module.exports = Router;
