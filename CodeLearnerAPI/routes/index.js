// importing the routers
const userRouter = require("./userRouter"),
  auth = require("./auth");

// initializing the router setup
const routesSetup = (app) => {
  app.get("/", (req, res) => res.send("Welcome - CodeLearner API!"));
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/auth", auth);
};

module.exports = routesSetup;
