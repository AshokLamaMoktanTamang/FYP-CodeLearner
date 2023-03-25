const InterviewModel = require("../models/interviewModel");

const fetchInterview = async () => {
    const interviews = await InterviewModel.find().populate("user", "firstName lastName email profilePic")

    if (!interviews) {
        throw "Failed to fetch interviews";
    }

    return interviews
}

module.exports = { fetchInterview }