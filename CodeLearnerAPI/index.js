// importing dependencies
const express = require("express"),
  app = express(),
  cors = require("cors");

// for using environmental variable
const dotenv = require("dotenv");
dotenv.config();

// importing database connection
const db = require("./dbConnect");
db();

// cors policy for other server
app.use(cors({
  origin: '*',
  credentials: true,
}));

// using the json for expres
app.use(express.json());

// making routes
const routesSetup = require("./routes/index");
routesSetup(app);

// listening at port
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`CodeLearner app listening at port http://localhost:${port}`);
});
