const mongoose = require("mongoose");


const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL || require("./connectionString.json")["mongoConnStringDev"], {
     useNewUrlParser: true })
};

module.exports = connectDb;