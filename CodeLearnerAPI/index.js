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
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// using the json for expres
app.use(express.json());
app.use('/cv', express.static('./uploads/CVs'))
app.use('/course', express.static('./uploads/Courses'))
app.use('/thumbnail', express.static('./uploads/Thumbnails'))
app.use('/profile', express.static('./uploads/Profiles'))

// making routes
const routesSetup = require("./routes/index");
routesSetup(app);

// listening at port
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`CodeLearner app listening at port http://localhost:${port}`);
});
