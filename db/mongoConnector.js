const mongoose = require("mongoose");

const Project = require("../models/project.js");

const connection = "mongodb://localhost:27017/gamitude";

const connectDb = () => {
  return mongoose.connect(connection, { useNewUrlParser: true })
};

module.exports = connectDb;