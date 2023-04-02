// importing models and packages
const courseModel = require("../models/course"),
  purchaseModel = require("../models/purchaseModel"),
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
  const course = await courseModel
    .findById(id)
    .populate("teacherId", "id firstName lastName email");

  if (!course) {
    throw "Course not found";
  }

  return course;
};

const fetchTenCourse = async () => {
  const courses = await courseModel
    .find({
      status: "approved",
    })
    .limit(10)
    .populate("teacherId", "id firstName lastName email")
    .sort({
      createdAt: -1,
    });

  if (!courses) {
    throw "Courses not found";
  }

  return courses;
};

const fetchCourseByUser = async (id) => {
  const course = await courseModel
    .find({
      teacherId: id,
    })
    .sort({
      createdAt: -1,
    })
    .populate("teacherId", "id firstName lastName email");

  if (!course) {
    throw "Course not found";
  }

  return course;
};

const fetchApprovedCourseByUser = async (id) => {
  const course = await courseModel
    .find({
      teacherId: id,
      status: "approved"
    })
    .sort({
      createdAt: -1,
    })
    .populate("teacherId", "id firstName lastName email");

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

const searchCourse = async (searchQuery) => {
  const regex = new RegExp(searchQuery.toLowerCase(), "i");

  const courses = await courseModel
    .find({
      courseName: {
        $regex: regex,
      },
      courseDescription: {
        $regex: regex,
      },
    })
    .populate("teacherId", "id firstName lastName email");

  if (!courses) {
    throw "Courses not found";
  }

  return courses;
};

const purchaseCourse = async (user, course) => {
  const exist = await courseModel.findById(course);

  if (!exist) {
    throw "Course not found";
  }

  const alreadyPurchase = await purchaseModel.findOne({
    user,
    course,
  });

  if (alreadyPurchase) {
    throw "Course already purchased";
  }

  const purchase = await purchaseModel.create({
    user,
    course,
  });

  if (!course) {
    throw "Failed to purchase course";
  }

  return purchase;
};

const fetchUserPurchasedCourse = async (user) => {
  const courses = await purchaseModel
    .find({
      user,
    })
    .populate({
      path: "course",
      select: "id courseName courseDescription thumbnail price teacherId",
      populate: { path: "teacherId", select: "firstName lastName" },
    });

  if (!courses) {
    throw "Failed to fetch course";
  }

  return courses;
};

const fetchCoursePurchasedUser = async (course) => {
  const exist = await courseModel.findById(course);

  if (!exist) {
    throw "Course not found";
  }

  const courses = await purchaseModel
    .find({
      course,
    })
    .populate("user", "firstName lastName profilePic");

  if (!courses) {
    throw "Failed to fetch users";
  }

  return courses;
};

const rateCourse = async (course, user, rating) => {
  const exist = await courseModel.findById(course);

  if (!exist) {
    throw "Course not found";
  }

  const alreadyRated = exist.ratings.find(
    (userRating) => userRating.user.toString() === user
  );

  if (alreadyRated) {
    alreadyRated.rating = rating;
  } else {
    exist.ratings.push({ user, rating });
  }

  let avg = 0;
  exist.ratings.map((rate) => {
    avg += rate.rating;
  });
  exist.avgRating = avg / exist.ratings.length;
  exist.save();

  if (!exist) {
    throw "Failed to rate the course";
  }

  return exist;
};

const fetchPendingCourse = async () => {
  const courses = await courseModel
    .find({
      status: "pending",
    })
    .populate("teacherId", "firstName lastName email");

  if (!courses) {
    throw "Courses not found";
  }

  return courses;
}

const approveCourse = async (courseId) => {
  const exist = await courseModel.findById(courseId);

  if (!exist) {
    throw "Course not found";
  }

  const course = await courseModel.findByIdAndUpdate(courseId, {
    status: "approved"
  }).populate("teacherId", "email firstName lastName")

  if (!course) {
    throw "Course not approved";
  }

  return course
}

const rejectCourse = async (courseId) => {
  const exist = await courseModel.findById(courseId);

  if (!exist) {
    throw "Course not found";
  }

  const course = await courseModel.findByIdAndUpdate(courseId, {
    status: "rejected"
  }).populate("teacherId", "email firstName lastName")

  if (!course) {
    throw "Course not rejected";
  }

  return course
}

const checkPurchased = async (user, course) => {
  const exist = await courseModel.findById(course);

  if (!exist) {
    throw "Course not found";
  }

  const alreadyPurchase = await purchaseModel.findOne({
    user,
    course,
  });

  if (!alreadyPurchase) {
    throw "Course not purchased";
  }

  return alreadyPurchase
}

const bestSellerCourse = async () => {
  const coursePurchaseCount = await purchaseModel.aggregate([
    {
      $group: {
        _id: '$course',
        sellCount: { $sum: 1 }
      },
    },
    {
      $lookup: {
        from: "courses",
        localField: "_id",
        foreignField: "_id",
        as: "course"
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: "course.teacherId",
        foreignField: "_id",
        as: "teacher"
      }
    },
    {
      "$project": {
        "_id": 1,
        "course.courseName": 1,
        "course.thumbnail": 1,
        "course.avgRating": 1,
        "course.ratings": 1,
        "course.price": 1,
        "teacher.firstName": 1,
        "teacher.lastName": 1,
        "sellCount": 1,
      }
    },
    {
      $limit: 10
    }
  ]).sort(
    { "sellCount": -1 }
  )

  return coursePurchaseCount
}

module.exports = {
  addCourse,
  fetchCourseById,
  fetchCourseByUser,
  fetchApprovedCourseByUser,
  fetchTenCourse,
  updateCourse,
  deleteCourse,
  searchCourse,
  purchaseCourse,
  fetchUserPurchasedCourse,
  fetchCoursePurchasedUser,
  rateCourse,
  fetchPendingCourse,
  approveCourse,
  rejectCourse,
  checkPurchased,
  bestSellerCourse
};
