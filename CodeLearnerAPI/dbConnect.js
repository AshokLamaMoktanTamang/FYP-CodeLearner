// importing mongoose for db connection
const mongoose = require("mongoose");
const uri = process.env.MONGO_URI;

// using mongoose connection string
const connect = () => {
  mongoose.connect(uri, () => {
    console.log("Connected to mongo sucessfully");
  });
};

module.exports = connect;
