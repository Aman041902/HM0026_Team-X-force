const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title:{ type: String },
  description: { type: String },
  url: { type: String },
  thumbnail: { type: String },
  duration: { type: Number }, 
  views: { type: Number , default : 0},
  likes: { type: Number , default : 0},
  uploadDate: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  email : {type : String},
  tags: [
    {
        type : String
    },
  ]
});


module.exports = mongoose.model('Video', videoSchema);