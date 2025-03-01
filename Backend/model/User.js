const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["instructor", "admin", "student"],
  },
  course: String,
  token: String,
  avatar: String,
});

module.exports = mongoose.model("User", schema);
