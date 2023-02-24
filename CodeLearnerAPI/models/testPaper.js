const mongoose = require("mongoose");
const { Schema } = mongoose;

const TestPaperSchema = new Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    formLabel: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    questions: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const TestPaperModel = mongoose.model("TestPaper", TestPaperSchema);
module.exports = TestPaperModel;
