const mongoose = require("mongoose");
const { Schema } = mongoose;

const RatingSchema = new Schema(
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
    rating: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const RatingModel = mongoose.model("Rating", RatingSchema);
module.exports = RatingModel;
