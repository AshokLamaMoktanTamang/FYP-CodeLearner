const mongoose = require("mongoose");
const { Schema } = mongoose;

const interviewSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    interviewTime: {
      type: Date,
      required: true
    },
    feedback: {
      type: String,
    },
  },
  { timestamps: true }
);

const interviewModel = mongoose.model("Interview", interviewSchema);
module.exports = interviewModel;
