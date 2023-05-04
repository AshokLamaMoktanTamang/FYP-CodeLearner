const interviewService = require("../services/interviewService");

const fetchInterview = async (req, res) => {
  try {
    const { id } = req.user;

    if (!id) {
      return res.status(500).json({
        msg: "Interview not fetched",
        error: "action prohibited",
      });
    }

    const interviews = await interviewService.fetchInterview();

    if (!interviews) {
      return res.status(500).json({
        msg: "Failed to fetch interview",
        error: "Internal Server error",
      });
    }

    return res.status(200).json({
      msg: "Interview fetched sucessfully",
      interviews,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Failed to fetch interview",
      error,
    });
  }
}

const fetchInterviewByToken = async (req, res) => {
  try {
    const { id } = req.user;

    if (!id) {
      return res.status(500).json({
        msg: "Interview not fetched",
        error: "action prohibited",
      });
    }

    const interview = await interviewService.fetchInterviewByUser(id);

    if (!interview) {
      return res.status(500).json({
        msg: "Failed to fetch interview",
        error: "Internal Server error",
      });
    }

    return res.status(200).json({
      msg: "Interview fetched sucessfully",
      interview,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Failed to fetch interview",
      error,
    });
  }
}

module.exports = {
  fetchInterview,
  fetchInterviewByToken
};