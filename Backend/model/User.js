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
  videoplaylist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video'
    }
  ],
  history: [ 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video' 
    }
  ],
  points: Number,
  token: String,
  avatar: String,
});

module.exports = mongoose.model("User", schema);
