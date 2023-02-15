// importing models and packages
const courseModel = require("../models/course"),
  fs = require("fs");

const addCourse = async (
  teacherId,
  courseName,
  courseDescription,
  learningOutcome,
  courseFile,
  thumbnail,
  price
) => {
  const course = await courseModel.create({
    teacherId,
    courseName,
    courseDescription,
    learningOutcome,
    courseFile,
    thumbnail,
    price,
  });

  if (!course) {
    throw "Course not added";
  }

  return course;
};

const fetchCourseById = async (id) => {
  const course = await courseModel.findById(id);

  if (!course) {
    throw "Course not found";
  }

  return course;
};

const fetchCourseByUser = async (id) => {
  const course = await courseModel.find({
    teacherId: id,
  });

  if (!course) {
    throw "Course not found";
  }

  return course;
};

const updateCourse = async (courseId, teacherId, data) => {
  const exist = await courseModel.findById(courseId);

  if (!exist) {
    throw "Course not found";
  }

  if (exist.teacherId != teacherId) {
    throw "Action prohibited";
  }

  const course = await courseModel.findByIdAndUpdate(courseId, data);

  if (!course) {
    throw "Failed to update course";
  }

  if (data.thumbnail) {
    fs.unlink(`./uploads/Thumbnails/${exist.thumbnail}`, (err) => {
      if (err) console.log(err);
    });
  }

  return course;
};

const deleteCourse = async (teacherId, id) => {
  const exist = await courseModel.findById(id);

  if (!exist) {
    throw "Course not found";
  }

  if (exist.teacherId != teacherId) {
    throw "Action prohibited";
  }

  await courseModel.findByIdAndDelete(id).then(() => {
    fs.unlink(`./uploads/Courses/${exist.courseFile}`, (err) => {
      if (err) console.log(err);
    });
    fs.unlink(`./uploads/Thumbnails/${exist.thumbnail}`, (err) => {
      if (err) console.log(err);
    });
  });

  return "Course deleted sucessfully";
};

module.exports = {
  addCourse,
  fetchCourseById,
  fetchCourseByUser,
  updateCourse,
  deleteCourse,
};
