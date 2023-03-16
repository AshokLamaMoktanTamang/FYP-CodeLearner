const express = require("express"),
  Router = express.Router();

const { addComment, fetchComments } = require("../controllers/commentController");

const verifyUserToken = require("../middleware/verifyUserToken");

Router.post("/:courseId", verifyUserToken, addComment);
Router.get("/:courseId", verifyUserToken, fetchComments);

module.exports = Router;
