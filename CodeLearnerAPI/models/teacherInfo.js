const mongoose = require("mongoose");
const { Schema } = mongoose;

const teacherInfoSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    teachingType: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      required: true,
    },
    aboutSelf: {
      type: String,
      required: true,
    },
    CV: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const teacherInfoModel = mongoose.model("TeacherInfo", teacherInfoSchema);
module.exports = teacherInfoModel;
