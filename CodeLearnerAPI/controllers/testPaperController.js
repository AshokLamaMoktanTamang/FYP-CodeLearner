const testPaperService = require("../services/testPaperService");

const addTestPaper = async (req, res) => {
  try {
    const { courseId } = req.params,
      { id } = req.user,
      { formLabel, description, questions } = req.body;

    const testPaper = await testPaperService.addTestPaper(
      courseId,
      formLabel,
      description,
      questions,
      id
    );

    if (!testPaper) {
      return res.status(500).json({
        msg: "Testpaper not added",
        error: "Internal Server error",
      });
    }

    return res.status(200).json({
      msg: "Testpaper added sucessfully",
      testPaper,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Testpaper not added",
      error,
    });
  }
};

const fetchTestPaper = async (req, res) => {
  try {
    const { courseId } = req.params,
      { id } = req.user;

    const testPaper = await testPaperService.fetchTestPaper(courseId, id);

    if (!testPaper) {
      return res.status(500).json({
        msg: "Failed to fetch test paper",
        error: "Internal Server error",
      });
    }

    return res.status(200).json({
      msg: "Testpaper fetched sucessfully",
      testPaper,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Failed to fetch test paper",
      error,
    });
  }
};

const deleteTestpaper = async (req, res) => {
  try {
    const { courseId } = req.params,
      { id } = req.user;

    const testPaper = await testPaperService.deleteTestPaper(courseId, id);

    if (!testPaper) {
      return res.status(500).json({
        msg: "Testpaper not deleted",
        error: "Internal Server error",
      });
    }

    return res.status(200).json({
      msg: "Testpaper deleted sucessfully",
      testPaper,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Testpaper not deleted",
      error,
    });
  }
};

const testPaperExistence = async (req, res) => {
  try {
    const { courseId } = req.params,
      { id } = req.user;
    
    if(!id) {
      return res.status(401).send(false);
    }
    
    const testPaper = await testPaperService.testPaperExistence(courseId);
    
    if(!testPaper){
      return res.status(401).send(false);
    }
    
    return res.status(200).send(true);
  } catch (error) {
    return res.status(500).send(false);
  }
}

const fetchTestPaperForStudent = async (req, res) => {
  try {
    const { courseId } = req.params,
      { id } = req.user;

    const testPaper = await testPaperService.fetchTestPaperForStudent(courseId);

    if (!testPaper) {
      return res.status(500).json({
        msg: "Failed to fetch test paper",
        error: "Internal Server error",
      });
    }

    return res.status(200).json({
      msg: "Testpaper fetched sucessfully",
      testPaper,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Failed to fetch test paper",
      error,
    });
  }
}

module.exports = { addTestPaper, fetchTestPaper, deleteTestpaper, testPaperExistence, fetchTestPaperForStudent };
