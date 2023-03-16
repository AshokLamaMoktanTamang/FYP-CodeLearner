// importing models and packages
const teacherInfoModel = require("../models/teacherInfo"),
  interviewModel = require("../models/interviewModel"),
  fs = require("fs");

const addInfo = async (userId, teachingType, profession, aboutSelf, CV) => {
  const existence = await teacherInfoModel.findOne({
    userId,
  });

  if (existence) {
    throw "Form already submitted";
  }

  const info = await teacherInfoModel.create({
    userId,
    teachingType,
    profession,
    aboutSelf,
    CV,
  });

  if (!info) {
    throw "Information not added";
  }

  return info;
};

const fetchInfo = async (userId) => {
  const info = await teacherInfoModel
    .findOne({
      userId,
    })
    .populate("userId", "id firstName lastName email");

  if (!info) {
    throw "Information not Found";
  }

  return info;
};

const fetchAllInfo = async () => {
  const infos = await teacherInfoModel
    .find({
      status: "pending",
    })
    .populate("userId", "id firstName lastName email profilePic");

  if (!infos) {
    throw "Information not Found";
  }

  return infos;
};

const rejectRequest = async (userId) => {
  const existence = await teacherInfoModel.findOne({
    userId,
  });

  if (!existence) {
    throw "Request doesnt exist";
  }

  const info = await teacherInfoModel
    .findByIdAndDelete(existence._id)
    .populate("userId", "id firstName lastName email");

  fs.unlink(`./uploads/CVs/${existence.CV}`, (err) => {
    if (err) console.log(err);
  });

  if (!info) {
    throw "Failed to delete information";
  }

  return info;
};

const approveRequest = async (userId, datetime) => {
  const existence = await teacherInfoModel.findOne({
    userId,
  });

  if (!existence) {
    throw "Request doesnt exist";
  }

  const info = await teacherInfoModel
    .findByIdAndUpdate(existence._id, {
      status: "Interview Assigned",
    })
    .populate("userId", "id firstName lastName email");

  if (!info) {
    throw "Failed to approve information";
  }

  const interview = await interviewModel.create({
    user: userId,
    interviewTime: datetime,
  });

  if (!interview) {
    await teacherInfoModel.findByIdAndUpdate(existence._id, {
      status: "Pending",
    });
    throw "Failed to assign interview";
  }

  return info;
};

module.exports = {
  addInfo,
  fetchInfo,
  fetchAllInfo,
  rejectRequest,
  approveRequest,
};
