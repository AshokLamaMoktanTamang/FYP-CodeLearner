// importing models and packages
const teacherInfoModel = require("../models/teacherInfo");

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

module.exports = { addInfo, fetchInfo };
