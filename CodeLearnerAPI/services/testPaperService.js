const TestPaperModel = require("../models/testPaper"),
  CourseModel = require("../models/course");

const addTestPaper = async (
  courseId,
  formLabel,
  description,
  questions,
  id
) => {
  const existence = await CourseModel.findById(courseId);

  if (!existence) {
    throw "Course not found";
  }

  if (existence.teacherId != id) {
    throw "Action prohibited";
  }

  const duplicateCheck = await TestPaperModel.findOne({
    courseId,
  });

  if (duplicateCheck) {
    throw "Testpaper already exist";
  }

  const testPaper = await TestPaperModel.create({
    courseId,
    formLabel,
    description,
    questions,
  });

  if (!testPaper) {
    throw "Testpaper not added";
  }

  return testPaper;
};

const fetchTestPaper = async (courseId, id) => {
  const existence = await CourseModel.findById(courseId);

  if (!existence) {
    throw "Course not found";
  }

  if (existence.teacherId != id) {
    throw "Action prohibited";
  }

  const testPaper = await TestPaperModel.findOne({
    courseId,
  });

  if (!testPaper) {
    throw "Testpaper not found";
  }

  return testPaper;
};

const deleteTestPaper = async (courseId, id) => {
  const existence = await CourseModel.findById(courseId);

  if (!existence) {
    throw "Course not found";
  }

  if (existence.teacherId != id) {
    throw "Action prohibited";
  }

  const testPaper = await TestPaperModel.findOneAndDelete({ courseId });

  if (!testPaper) {
    throw "Testpaper not deleted";
  }

  return testPaper;
};

const testPaperExistence =  async (courseId) => {
  const existence = await CourseModel.findById(courseId);

  if (!existence) {
    throw "Course not found";
  }

  const testPaper = await TestPaperModel.findOne({
    courseId,
  });

  if (!testPaper) {
    throw "Testpaper not found";
  }

  return true
}

const fetchTestPaperForStudent = async (courseId) => {
  const existence = await CourseModel.findById(courseId);

  if (!existence) {
    throw "Course not found";
  }

  const testPaper = await TestPaperModel.findOne({
    courseId,
  }).populate('courseId', 'courseName');

  if (!testPaper) {
    throw "Testpaper not found";
  }

  return testPaper;
};

module.exports = {
  addTestPaper,
  fetchTestPaper,
  deleteTestPaper,
  testPaperExistence,
  fetchTestPaperForStudent
};
