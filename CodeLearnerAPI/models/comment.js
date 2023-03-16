const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const commentModel = mongoose.model("Comment", commentSchema);
module.exports = commentModel;
