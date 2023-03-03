const mongoose = require("mongoose");
const { Schema } = mongoose;

const CourseAction = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
  },
  { timestamps: true }
);

const savedCourseModel = mongoose.model("SavedCourse", CourseAction);
const purchasedCourseModel = mongoose.model("PurchasedCourse", CourseAction);
module.exports = { savedCourseModel, purchasedCourseModel };
