const mongoose = require("mongoose");

require("dotenv").config();

const connectDb = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => {
      console.log("Error in database connection", error.message);
    });
};

module.exports = connectDb;