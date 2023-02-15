// initializing the instance of express router
const express = require("express"),
  Router = express.Router(),
  validateRequestBody = require("../middleware/validateRequestBody"),
  courseValidation = require("../requestValidations/courseValidation");

// importing the controllers
const {
  addCourse,
  fetchCourseById,
  fetchCourseByUser,
  fetchCourseByToken,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

// importing middleware for validating header token and file upload
const verifyUserToken = require("../middleware/verifyUserToken"),
  { courseUpload } = require("../middleware/fileUpload");

// making the end points for user
Router.post(
  "/",
  verifyUserToken,
  courseUpload.fields([
    {
      name: "courseFile",
    },
    {
      name: "thumbnail",
    },
  ]),
  validateRequestBody(courseValidation),
  addCourse
);
Router.get("/:courseId", verifyUserToken, fetchCourseById);
Router.get("/user/:teacherId", verifyUserToken, fetchCourseByUser);
Router.get("/", verifyUserToken, fetchCourseByToken);
Router.put(
  "/:courseId",
  verifyUserToken,
  courseUpload.fields([
    {
      name: "thumbnail",
    },
  ]),
  updateCourse
);
Router.delete("/:courseId", verifyUserToken, deleteCourse);

module.exports = Router;
