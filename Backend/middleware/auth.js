const jwttoken = require('jsonwebtoken');
const User = require('../model/User');

require('dotenv').config();

exports.auth = async (req,res,next) =>{
    try 
    {
        const token = req.body.token || req.headers.token;
        // console.log(token,req.headers.Authorization)
        const decodedtoken = jwttoken.verify(token,process.env.JWT_SECRET);

        // console.log("dedoded",decodedtoken);

        req.body.email = decodedtoken.email;
        req.body.role = decodedtoken.role;

        const UserExist = await User.findOne({email : decodedtoken.email});

        // console.log(UserExist) 
        if(!UserExist)
        {
            return res.status(400).json({
                success : false,
                message : "User not exist"
            })
        }
        
        console.log("calling next route");
        next();
    }
    catch(error)
    {
        console.log(error.message);
    }
}

exports.isStudent = async (req,res,next) =>{
    try 
    {
        const {role} = req.body;
        console.log("role is ",role);

        if(role!=='student')
        {
            return res.status(400).json({
                success : false,
                message : "You are not authorized to view this page"
            })
        }
        
        next();
    }
    catch(error)
    {
        console.log("here",error.message); 
    }
}


exports.isInstructor = async (req,res,next) =>{
    try 
    {
        const {role} = req.body;
        
        if(role!=='instructor')
        {
            return res.status(400).json({
                success : false,
                message : "You are not authorized to view this page"
            })
        }
        
        next();
    }
    catch(error)
    {
        console.log(error.message);
    }
}


exports.isAdmin = async (req,res,next) =>{
    try 
    {
        const {role} = req.body;
        
        if(role!=='admin')
        {
            return res.status(400).json({
                success : false,
                message : "You are not authorized to view this page"
            })
        }
        
        next();
    }
    catch(error)
    {
        console.log(error.message);
    }
}