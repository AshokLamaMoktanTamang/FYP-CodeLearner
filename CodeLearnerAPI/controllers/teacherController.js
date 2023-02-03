const teacherService = require("../services/teacherService");

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
        info,
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

module.exports = { addTeacherInfo, fetchTeacherInfo };
