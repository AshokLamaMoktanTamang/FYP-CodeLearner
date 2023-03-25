// importing the routers
const userRouter = require("./userRouter"),
  teacherRouter = require("./teacherRouter"),
  auth = require("./auth"),
  course = require("./courseRouter"),
  testPaper = require("./testPaperRouter"),
  adminRouter = require("./adminRoute"),
  commentRouter = require("./commentRouter"),
  interviewRouter = require("./interviewRoute");

// initializing the router setup
const routesSetup = (app) => {
  app.use("/api/user/v1", userRouter);
  app.use("/api/teacher/v1", teacherRouter);
  app.use("/api/auth/v1", auth);
  app.use("/api/course/v1", course);
  app.use("/api/testPaper/v1", testPaper);
  app.use("/api/admin/v1", adminRouter);
  app.use("/api/comment/v1", commentRouter);
  app.use("/api/interview/v1", interviewRouter);
};

module.exports = routesSetup;
