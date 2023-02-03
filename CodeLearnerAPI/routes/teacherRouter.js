// initializing the instance of express router
const express = require("express"),
  Router = express.Router(),
  validateRequestBody = require("../middleware/validateRequestBody"),
  teacherInfoValidation = require("../requestValidations/teacherInfoValidation");

// importing the controllers
const {
  addTeacherInfo,
  fetchTeacherInfo,
} = require("../controllers/teacherController");

// importing middleware for validating header token and file upload
const verifyUserToken = require("../middleware/verifyUserToken"),
  fileUpload = require("../middleware/fileUpload");

// making the end points for user
Router.post(
  "/info",
  verifyUserToken,
  fileUpload.single("CV"),
  validateRequestBody(teacherInfoValidation),
  addTeacherInfo
);
Router.get("/info", verifyUserToken, fetchTeacherInfo);

module.exports = Router;
