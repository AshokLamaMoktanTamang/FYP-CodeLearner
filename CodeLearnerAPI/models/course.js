const mongoose = require("mongoose");
const { Schema } = mongoose;

const CourseSchema = new Schema(
  {
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    courseName: {
      type: String,
      required: true,
    },
    courseDescription: {
      type: String,
      required: true,
    },
    learningOutcome: {
      type: Array,
      required: true,
    },
    courseFile: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    avgRating: {
      type: Number,
      default: 0,
    },
    ratings: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rating: {
          type: Number,
        },
      },
    ],
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const courseModel = mongoose.model("Course", CourseSchema);
module.exports = courseModel;
