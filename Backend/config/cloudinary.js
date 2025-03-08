const cloudinary = require('cloudinary').v2; // Use v2 for the latest Cloudinary API
const Video = require('../model/video');
const User = require('../model/User')
require('dotenv').config();

const connectCloud = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.CLOUD_SECRET
    });
    console.log("Cloudinary connected successfully");
  } catch (error) {
    console.log(error.message);
  }
};

const fileUpload = async (req, res) => {
  try {
    const video = req.files.video || req.files.videos;
    const image = req.files.image;
    const email = req.body.email;
    const { title, description, duration, tags } = req.body;

    const supportedTypeVideo = ["mp4", "mov"];
    if (!supportedTypeVideo.includes(video.name.split(".")[1])) {
      return res.status(400).json({
        success: false,
        message: "Video type not supported"
      });
    }

    const supportedTypeimage = ["jpg", "jpeg", "png"];
    if (!supportedTypeimage.includes(image.name.split(".")[1])) {
      return res.status(400).json({
        success: false,
        message: "File type not supported"
      });
    }

    if (video.size > 1048576 * 100 || image.size > 1048576 * 100) {
      return res.status(400).json({
        success: false,
        message: "File size limit exceeded"
      });
    }

    try {

      const userExist = await User.findOne({email : email});

      const video_response = await cloudinary.uploader.upload(video.tempFilePath, {
        folder: "platform-edu",
        resource_type: "auto"
      });

      const image_response = await cloudinary.uploader.upload(image.tempFilePath, {
        folder: 'platform-edu'
      });

      const file = await Video.create({
        title,
        description,
        duration,
        tags,
        url: video_response.secure_url,
        thumbnail : image_response.secure_url,
        instructor : userExist._id
      });

      const a = await User.findByIdAndUpdate(userExist._id,
        { 
          $push: { playlist: file._id } 
        },{ new: true })

      const b = await Video.findByIdAndUpdate(file._id,
        {
          email : userExist._id
        },{new : true}
      )

      console.log("a is ",a,"b is ",b);

      return res.status(200).json({
        success: true,
        message: "Files uploaded successfully",
        data: file
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Video cannot be uploaded"
    });
  }
};

module.exports = { connectCloud, fileUpload };
