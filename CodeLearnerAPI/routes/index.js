// importing the routers
const userRouter = require("./userRouter"),
  teacherRouter = require("./teacherRouter"),
  auth = require("./auth");

// initializing the router setup
const routesSetup = (app) => {
  app.use("/api/user/v1", userRouter);
  app.use("/api/teacher/v1", teacherRouter);
  app.use("/api/auth/v1", auth);
};

module.exports = routesSetup;
