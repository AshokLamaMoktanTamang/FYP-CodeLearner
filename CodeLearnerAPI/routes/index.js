// importing the routers
const userRouter = require("./userRouter");

// initializing the router setup
const routesSetup = (app) => {
  app.get("/", (req, res) => res.send("Welcome - CodeLearner API!"));
  app.use("/api/v1/user", userRouter);
};

module.exports = routesSetup;
