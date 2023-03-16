const mongoose = require("mongoose");
const { Schema } = mongoose;

const purchaseSchema = new Schema(
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
    isactive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

const purchaseModel = mongoose.model("Purchase", purchaseSchema);
module.exports = purchaseModel;
