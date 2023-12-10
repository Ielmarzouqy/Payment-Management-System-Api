const mongoose = require("mongoose");
require("dotenv").config();
// const environment = require("../../config/environment");
mongoose.set("strictQuery", true);

// mongoose.connect(environment.mongo.MONGO_URI, {
//   dbName: environment.mongo.MONGO_DB_NAME,
// });

mongoose.connect(process.env.DB_URL, {
    dbName: process.env.DB_NAME,
  });

mongoose.connection
  .once("open", () => {
    console.log("connection to database established successfully.");
  })
  .on("error", (error) => {
    console.log(`error while connecting to database: ${error}`);
  })
  .on("disconnected", () => {
    console.log("database connection closed.");
  });

module.exports = mongoose;
