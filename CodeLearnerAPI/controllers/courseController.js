const cousreService = require("../services/courseService");

const addCourse = async (req, res) => {
  try {
    const { id } = req.user;
    const {
        courseName,
        courseDescription,
        learningOutcome,
        courseFile,
        thumbnail,
        price,
      } = req.body,
      course = await cousreService.addCourse(
        id,
        courseName,
        courseDescription,
        learningOutcome,
        courseFile,
        thumbnail,
        price
      );

    if (!course) {
      return res.status(500).json({
        msg: "Course not added",
        error: "Internal Server error",
      });
    }

    return res.status(200).json({
      msg: "Cousre added sucessfully",
      course,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Course not added",
      error,
    });
  }
};

const fetchCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await cousreService.fetchCourseById(courseId);

    if (!course) {
      return res.status(500).json({
        msg: "Failed to fetch course",
        error: "Internal Server error",
      });
    }

    return res.status(200).json({
      msg: "Cousre fetched sucessfully",
      course,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Failed to fetch course",
      error,
    });
  }
};

const fetchCourseByUser = async (req, res) => {
  try {
    const { teacherId } = req.params;

    const course = await cousreService.fetchCourseByUser(teacherId);

    if (!course) {
      return res.status(500).json({
        msg: "Course not fetched",
        error: "Internal Server error",
      });
    }

    return res.status(200).json({
      msg: "Cousre fetched sucessfully",
      course,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Course not fetched",
      error,
    });
  }
};

const fetchCourseByToken = async (req, res) => {
  try {
    const { id } = req.user;

    const course = await cousreService.fetchCourseByUser(id);

    if (!course) {
      return res.status(500).json({
        msg: "Course not fetched",
        error: "Internal Server error",
      });
    }

    return res.status(200).json({
      msg: "Cousre fetched sucessfully",
      course,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Course not fetched",
      error,
    });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { id } = req.user;
    const { courseId } = req.params;

    const course = await cousreService.updateCourse(courseId, id, req.body);

    if (!course) {
      return res.status(500).json({
        msg: "Failed to update course",
        error: "Internal Server error",
      });
    }

    return res.status(200).json({
      msg: "Cousre updated sucessfully",
      course,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Failed to update course",
      error,
    });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.user;
    const { courseId } = req.params;

    const course = await cousreService.deleteCourse(id, courseId);

    if (!course) {
      console.log(course);
      return res.status(500).json({
        msg: "Course not deleted",
        error: "Internal Server error",
      });
    }

    return res.status(200).json({
      msg: "Cousre deleted sucessfully",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Course not deleted",
      error,
    });
  }
};

module.exports = {
  addCourse,
  fetchCourseById,
  fetchCourseByUser,
  fetchCourseByToken,
  updateCourse,
  deleteCourse,
};
