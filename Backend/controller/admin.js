const User = require('../model/User')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Video = require('../model/video')
const { getInstructorVideo } = require('./instructor');

require('dotenv').config()

const flagVideos = async (req, res) => {
    try 
    {
        const videoId = req.body.videoId;

        const response = await Video.findByIdAndUpdate(
            videoId,
            { isVerified: true },
            { new: true }
          );
        
          console.log("response is ",response);

          return res.status(200).json({
            success : true,
            message : "Video verified successfully",
            data : response
          })

    }
    catch(error)
    {
        return res.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }
}

const getPendingVideo = async (req, res) => {
    try 
    {
        const response = await Video.find({isVerified : false}).populate('instructor').exec();

        return res.status(200).json({
            success : true,
            message : "Pending videos fetched successfully",
            data : response
        })
    }
    catch(error)
    {
        console.log(error.message)
        return res.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }
}

module.exports = {flagVideos,getPendingVideo};

