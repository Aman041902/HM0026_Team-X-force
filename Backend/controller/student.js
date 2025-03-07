const User = require('../model/User');
const Video = require('../model/video')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

require('dotenv').config()

exports.getLeaderBoard = async (req, res) => {
    try 
    {
        const response = await User.find({}).sort({points : -1}).limit(10);

        return res.status(200).json({
            success : true,
            message : "Leaderboard fetched successfully",
            data : response
        })
    }
    catch(error)
    {
        return res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }
}

exports.getVideos = async (req, res) => {
    try 
    {
        const videos = await Video.find({isVerified : true}).populate('instructor')
        .exec();

        return res.status(200).json({
            success : true,
            message : "Videos fetched successfully",
            data : videos
        })
    }
    catch(error)
    {
        res.status(500).json({
            success : false,
            message : "Iternal Server Error"
        })
    }
}

// video is clicked
exports.videoIsClicked = async (req,res) =>{
    try 
    {
        // from token
        const email = req.body.email;
        // from frontend
        const videoId = req.body.videoId;

        const userExist = await User.findOne({email : email});

        await User.findByIdAndUpdate(userExist._id,{
            $push : 
            {
                history : videoId
            }},
            {
                new : true
            }
        )

        await Video.findByIdAndUpdate(videoId,
            { 
                $inc: { views: 1 } 
            },
            {new : true}
        )

        return res.status(200).json({
            success : true,
            message : "video click updations done successfully"
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

exports.watchHistory = async(req, res) => {
    try
    {
        const email = req.body.email;

        const response = await User.findOne({ email: email })
        .select('history')
        .populate('history')
        .exec();

        return res.status(200).json({
            success : true,
            message : "History fetched successfully",
            data : response
        })
    }
    catch(error)
    {
        return res.status(500).json({
            success : false,
            message : "Internal Server error"
        })
    }
}

exports.getVideoById = async(req,res) =>{
    try 
    {
        const videoId = req.params.id
        const response = await Video.find({_id : videoId});

        console.log(response);
        return res.status(200).json({
            success : true,
            message : "Video data fetched successfully",
            data : response
        })
    }
    catch(error)
    {
        console.log(error.message)
        return res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }
}