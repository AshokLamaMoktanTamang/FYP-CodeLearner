const commentModel = require("../models/comment"),
  courseModel = require("../models/course");

const addComment = async (course, user, comment) => {
  const exist = await courseModel.findById(course);

  if (!exist) {
    throw "Course not found";
  }

  const userComment = await commentModel.create({
    user,
    course,
    comment,
  });

  if (!userComment) {
    throw "Failed to add comment";
  }

  return userComment.populate("user", "profilePic firstName lastName");
};

const fetchComment = async (course) => {
  const exist = await courseModel.findById(course);

  if (!exist) {
    throw "Course not found";
  }

  const userComment = await commentModel.find({
    course,
  }).populate("user", "profilePic firstName lastName").sort({
    createdAt: -1,
  });;

  if (!userComment) {
    throw "Failed to fetch comment";
  }

  return userComment;
};

module.exports = { addComment, fetchComment };
