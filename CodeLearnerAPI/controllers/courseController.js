const courseService = require("../services/courseService");

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
      course = await courseService.addCourse(
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

    const course = await courseService.fetchCourseById(courseId);

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

    const course = await courseService.fetchCourseByUser(teacherId);

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

    const course = await courseService.fetchCourseByUser(id);

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

const fetchTenCourse = async (req, res) => {
  try {
    const courses = await courseService.fetchTenCourse();

    if (!courses) {
      return res.status(500).json({
        msg: "Failed to fetch course",
        error: "Internal Server error",
      });
    }

    return res.status(200).json({
      msg: "Cousre fetched sucessfully",
      courses,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Failed to fetch courses",
      error,
    });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { id } = req.user;
    const { courseId } = req.params;

    const course = await courseService.updateCourse(courseId, id, req.body);

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

    const course = await courseService.deleteCourse(id, courseId);

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

const searchCourse = async (req, res) => {
  try {
    const { searchQuery } = req.params;

    const course = await courseService.searchCourse(searchQuery);

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

const purchaseCourse = async (req, res) => {
  try {
    const { id } = req.user;
    const { courseId } = req.params,
      course = await courseService.purchaseCourse(id, courseId);

    if (!course) {
      return res.status(500).json({
        msg: "Failed to purchase course",
        error: "Internal Server error",
      });
    }

    return res.status(200).json({
      msg: "Cousre purchased sucessfully",
      course,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Course not purchased",
      error,
    });
  }
};

const fetchUserPurchasedCourse = async (req, res) => {
  try {
    const { id } = req.user;
    courses = await courseService.fetchUserPurchasedCourse(id);

    if (!courses) {
      return res.status(500).json({
        msg: "Failed to fetch courses",
        error: "Internal Server error",
      });
    }

    return res.status(200).json({
      msg: "Cousre fetched sucessfully",
      courses,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Failed to fetch courses",
      error,
    });
  }
};

const fetchCoursePurchasedUser = async (req, res) => {
  try {
    const { courseId } = req.params,
      courses = await courseService.fetchCoursePurchasedUser(courseId);

    if (!courses) {
      return res.status(500).json({
        msg: "Failed to fetch users",
        error: "Internal Server error",
      });
    }

    return res.status(200).json({
      msg: "User fetched sucessfully",
      courses,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Failed to fetch users",
      error,
    });
  }
};

const rateCourse = async (req, res) => {
  try {
    const { courseId } = req.params,
      { rating } = req.body,
      { id } = req.user;

    if (!id) {
      return res.status(500).json({
        msg: "Failed to rate course",
        error: "Action Prohibited",
      });
    }

    const rate = await courseService.rateCourse(courseId, id, rating);

    if (!rate) {
      return res.status(500).json({
        msg: "Failed to rate course",
        error: "Internal Server error",
      });
    }

    return res.status(200).json({
      msg: "Course rated sucessfully",
      rate,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Failed to rate course",
      error,
    });
  }
};

module.exports = {
  addCourse,
  fetchCourseById,
  fetchCourseByUser,
  fetchCourseByToken,
  fetchTenCourse,
  updateCourse,
  deleteCourse,
  searchCourse,
  purchaseCourse,
  fetchUserPurchasedCourse,
  fetchCoursePurchasedUser,
  rateCourse
};
