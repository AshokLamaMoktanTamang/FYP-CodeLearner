const mongoose = require("mongoose");
const { Schema } = mongoose;

const reportSchema = new Schema(
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
        message: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const reportModel = mongoose.model("Report", reportSchema);
module.exports = reportModel;
