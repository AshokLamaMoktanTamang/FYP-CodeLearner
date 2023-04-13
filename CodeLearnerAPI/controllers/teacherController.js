const teacherService = require("../services/teacherService"),
  messageTemplate = require("../utils/messageTemplate"),
  approveMessageTemplate = require("../utils/approvedTemplate"),
  approvedTeacherTemplate = require('../utils/approveMessageTemplate')
  nodemailer = require("../utils/email");

const addTeacherInfo = async (req, res) => {
  try {
    const { id } = req.user;
    const { teachingType, profession, aboutSelf, CV } = req.body,
      info = await teacherService.addInfo(
        id,
        teachingType,
        profession,
        aboutSelf,
        CV
      );

    if (!info) {
      return res.status(500).json({
        msg: "Information not added",
        error: "Internal Server error",
      });
    }

    return res.status(200).json({
      msg: "Information added sucessfully",
      info,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Information not added",
      error,
    });
  }
};

const fetchTeacherInfo = async (req, res) => {
  try {
    const { id } = req.user;
    const info = await teacherService.fetchInfo(id);

    if (!info) {
      return res.status(400).json({
        msg: "Failed to fetch information",
      });
    }

    return res.status(200).send(info);
  } catch (error) {
    return res.status(500).json({
      msg: "Failed to fetch information",
      error,
    });
  }
};

const fetchTeacherInfoById = async (req, res) => {
  try {
    const { id } = req.params;
    const info = await teacherService.fetchInfo(id);

    if (!info) {
      return res.status(400).json({
        msg: "Failed to fetch information",
      });
    }

    return res.status(200).send(info);
  } catch (error) {
    return res.status(500).json({
      msg: "Failed to fetch information",
      error,
    });
  }
};

const fetchAllTeacherInfo = async (req, res) => {
  try {
    const infos = await teacherService.fetchAllInfo();

    if (!infos) {
      return res.status(400).json({
        msg: "Failed to fetch information",
      });
    }

    return res.status(200).send(infos);
  } catch (error) {
    return res.status(500).json({
      msg: "Failed to fetch information",
      error,
    });
  }
};

const rejectRequest = async (req, res) => {
  try {
    const { id } = req.user;
    const { userId } = req.params;
    const { message } = req.body;

    if (!id) {
      return res.status(500).json({
        msg: "Failed to reject teacher",
        error: "Action prohibited",
      });
    }

    const reject = await teacherService.rejectRequest(userId);

    if (!reject) {
      return res.status(400).json({
        msg: "Failed to delete information",
      });
    }

    await nodemailer(
      reject.userId.email,
      "Teacher Application Rejected",
      messageTemplate(reject.userId.firstName, reject.userId.lastName, message)
    ).catch((error) => {
      return res.status(500).send({ error });
    });

    return res.status(200).send(reject);
  } catch (error) {
    return res.status(500).json({
      msg: "Failed to reject teacher",
      error,
    });
  }
};

const assignInterview = async (req, res) => {
  try {
    const { id } = req.user;
    const { userId } = req.params;
    const { interviewTime } = req.body;

    if (!id) {
      return res.status(500).json({
        msg: "Failed to approve teacher",
        error: "Action prohibited",
      });
    }

    const approve = await teacherService.approveRequest(userId, interviewTime);

    if (!approve) {
      return res.status(400).json({
        msg: "Failed to assign interview",
      });
    }

    await nodemailer(
      approve.user.email,
      "Teacher Application Approved",
      approveMessageTemplate(approve.user.firstName, approve.user.lastName, new Date(interviewTime), approve._id, approve.user._id)
    ).catch((error) => {
      return res.status(500).send({ error });
    });

    return res.status(200).send(approve);
  } catch (error) {
    return res.status(500).json({
      msg: "Failed to approve teacher",
      error,
    });
  }
}

const approveRequest = async (req, res) => {
  try {
    const { id } = req.user;
    const { userId } = req.params;

    if (!id) {
      return res.status(500).json({
        msg: "Failed to approve teacher",
        error: "Action prohibited",
      });
    }

    const approve = await teacherService.approveTeacher(userId); 

    if (!approve) {
      return res.status(400).json({
        msg: "Failed to approve teacher",
      });
    }

    await nodemailer(
      approve.email,
      "Teacher Application Approved",
      approvedTeacherTemplate(approve.firstName, approve.lastName)
    ).catch((error) => {
      return res.status(500).send({ error });
    });

    return res.status(200).send(approve);
  } catch (error) {
    return res.status(500).json({
      msg: "Failed to approve teacher",
      error,
    });
  }
}

module.exports = {
  addTeacherInfo,
  fetchTeacherInfo,
  fetchAllTeacherInfo,
  fetchTeacherInfoById,
  rejectRequest,
  assignInterview,
  approveRequest
};
