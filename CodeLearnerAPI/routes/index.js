// importing the routers
const userRouter = require("./userRouter"),
  auth = require("./auth");

// initializing the router setup
const routesSetup = (app) => {
  app.get("/", (req, res) => res.send("Welcome - CodeLearner API!"));
  app.use("/api/user/v1", userRouter);
  app.use("/api/auth/v1", auth);
};

module.exports = routesSetup;
