// initializing the instance of express router
const express = require("express"),
  Router = express.Router(),
  validateRequestBody = require("../middleware/validateRequestBody"),
  teacherInfoValidation = require("../requestValidations/teacherInfoValidation");

// importing the controllers
const {
  addTeacherInfo,
  fetchTeacherInfo,
  fetchTeacherInfoById,
  fetchAllTeacherInfo,
  rejectRequest,
  assignInterview,
  approveRequest
} = require("../controllers/teacherController");

// importing middleware for validating header token and file upload
const verifyUserToken = require("../middleware/verifyUserToken"),
  { upload } = require("../middleware/fileUpload");

// making the end points for user
Router.post(
  "/info",
  verifyUserToken,
  upload.single("CV"),
  validateRequestBody(teacherInfoValidation),
  addTeacherInfo
);
Router.get("/info", verifyUserToken, fetchTeacherInfo);
Router.get("/info/user/:id", verifyUserToken, fetchTeacherInfoById);
Router.get("/info/all", verifyUserToken, fetchAllTeacherInfo);
Router.post("/info/reject/:userId", verifyUserToken, rejectRequest);
Router.post("/info/approve/:userId", verifyUserToken, assignInterview);
Router.post("/info/approve/teacher/:userId", verifyUserToken, approveRequest);

module.exports = Router;
