const commentService = require("../services/commentService");

const addComment = async (req, res) => {
  try {
    const { id } = req.user,
      { comment } = req.body,
      { courseId } = req.params;

    if(!id){
      return res.status(500).json({
        msg: "Failed to add comment",
        error: "Internal Server error",
      });
    }

    const userComment = await commentService.addComment(courseId, id, comment);

    if (!userComment) {
      return res.status(500).json({
        msg: "Failed to add comment",
        error: "Internal Server error",
      });
    }

    return res.status(200).json({
      msg: "Comment added sucessfully",
      userComment,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Failed to add comment",
      error,
    });
  }
};

const fetchComments = async (req, res) => {
  try {
    const { id } = req.user,
      { courseId } = req.params;

    if (!id) {
      return res.status(500).json({
        msg: "Failed to fetch comment",
        error: "Action Prohibited",
      });
    }

    const userComments = await commentService.fetchComment(courseId);

    if (!userComments) {
      return res.status(500).json({
        msg: "Failed to fetch comment",
        error: "Internal Server error",
      });
    }

    return res.status(200).json({
      msg: "Comment fetched sucessfully",
      userComments,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Failed to fetch comment",
      error,
    });
  }
};

module.exports = {
  addComment,
  fetchComments,
};
