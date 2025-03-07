const User = require('../model/User')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

require('dotenv').config()

exports.addVideo = async (req, res) => {
    
}


exports.getInstructorVideo = async(req, res) => {
    try 
    {
        const email = req.body.email;

        const response = await User.find({email : email}).select('playlist')
        .populate('playlist')
        .exec();
        
        console.log(response);
        return res.status(200).json({
            success : true,
            message : "Instructor videos fetched successfully",
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