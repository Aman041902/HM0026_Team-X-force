const User = require('../model/User')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

require('dotenv').config()

exports.signup = async (req,res) => {
  try 
  {
    const {email,firstname,lastname,role,password} = req.body;

    console.log(email,firstname,lastname,role,password,req.body);
    const userExist = await User.findOne({email : email});
    
    if(userExist)
    {
      return res.status(400).json({
        success : false,
        message : "User exist already"
      })
    }

    const hashedpassword = await bcrypt.hash(password,10);
    const newUser = await User.create({firstname,lastname,email,role,password : hashedpassword,
      avatar : `http://api.dicebear.com/5.x/initials/svg?seed=${firstname}%20${lastname}`
    });

    return res.status(200).json({
      success : true,
      user : newUser,
      message : "User created successfully"
    })

  }
  catch(error)
  {
    console.log(error.message);
  }
}


exports.login = async (req,res) => {
  try 
  {
    const {email,password} = req.body;

    const userExist = await User.findOne({email : email});
    console.log(email,password)
    if(!userExist)
    {
      return res.status(404).json({
        success : false,
        message : "User already exists"
      })
    }

    if(await bcrypt.compare(password,userExist.password))
    {

      const payload = {
        email : userExist.email,
        role : userExist.role
      }

      const jwttoken = jwt.sign(payload,process.env.JWT_SECRET);

      return res.status(200).json({
        success : true,
        message : "Login successfully",
        token : jwttoken
      })
    }
    else 
    {
      return res.status(402).json({
        success : false,
        message : "Invalid Password"
      })
    }

  }
  catch(error)
  {
    console.log(error.message);
  }
}


exports.getUserData = async (req,res) =>{
  try 
  {
    const {email} = req.body;
    console.log("email is ",email);

    const UserExist = await User.findOne({email : email});

    return res.status(200).json({
      success : true,
      message : "User data fetched successfully",
      data : UserExist
    })

  }
  catch(error)
  {
    console.log(error.message);
  }
}