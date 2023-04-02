// importing mongoose for db connection
const mongoose = require("mongoose");
const uri = process.env.MONGO_URI;

// using mongoose connection string
const connect = () => {
  mongoose.connect(uri).then(() => {
    console.log('connected to mongo sucessfully')
  }).catch(() => {
    console.log('failed to connect mongo');
  });
};

module.exports = connect;
