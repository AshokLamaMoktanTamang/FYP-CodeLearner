const InterviewModel = require("../models/interviewModel");

const fetchInterview = async () => {
    const interviews = await InterviewModel.find().populate("user", "firstName lastName email profilePic")

    if (!interviews) {
        throw "Failed to fetch interviews";
    }

    return interviews
}

const fetchInterviewByUser = async (user) => {
    const interview = await InterviewModel.findOne({
        user
    })

    if (!interview) {
        throw "Failed to fetch interview";
    }

    return interview
}

module.exports = { fetchInterview, fetchInterviewByUser }