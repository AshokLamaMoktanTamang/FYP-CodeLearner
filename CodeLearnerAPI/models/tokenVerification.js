const mongoose = require("mongoose");
const { Schema } = mongoose;

const tokenVerificationSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
  expireAt: {
    type: Date,
    required: true,
  },
});

const userModel = mongoose.model("token", tokenVerificationSchema);
module.exports = userModel;
