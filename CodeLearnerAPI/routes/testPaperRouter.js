// initializing the instance of express router
const express = require("express"),
  Router = express.Router(),
  validateRequestBody = require("../middleware/validateRequestBody"),
  testPaperValidation = require("../requestValidations/testPaperValidation");

// importing the controllers
const {
  addTestPaper,
  fetchTestPaper,
  deleteTestpaper,
  testPaperExistence,
  fetchTestPaperForStudent
} = require("../controllers/testPaperController");

// importing middleware for validating header token and file upload
const verifyUserToken = require("../middleware/verifyUserToken");

// making the end points for user
Router.post(
  "/:courseId",
  verifyUserToken,
  validateRequestBody(testPaperValidation),
  addTestPaper
);
Router.get("/:courseId", verifyUserToken, fetchTestPaper);
Router.delete("/:courseId", verifyUserToken, deleteTestpaper);
Router.get("/exist/:courseId", verifyUserToken, testPaperExistence);
Router.get("/student/:courseId", verifyUserToken, fetchTestPaperForStudent);

module.exports = Router;
