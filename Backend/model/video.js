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
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  isVerified : { type: Boolean , default : false},
  tags: [
    {
        type : String
    },
  ]
});


module.exports = mongoose.model('Video', videoSchema);