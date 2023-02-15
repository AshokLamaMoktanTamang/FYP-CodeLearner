// importing the routers
const userRouter = require("./userRouter"),
  teacherRouter = require("./teacherRouter"),
  auth = require("./auth"),
  course = require("./courseRouter");

// initializing the router setup
const routesSetup = (app) => {
  app.use("/api/user/v1", userRouter);
  app.use("/api/teacher/v1", teacherRouter);
  app.use("/api/auth/v1", auth);
  app.use("/api/course/v1", course);
};

module.exports = routesSetup;
