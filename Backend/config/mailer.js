const nodemailer = require('nodemailer');
require('dotenv').config();
 

let transporter = nodemailer.createTransport({
  host : process.env.EMAIL_HOST,
  auth : {
    user : process.env.EMAIL_USER,
    pass : process.env.EMAIL_PASS,
  }, 
  port : 587,
  secure : false
})
 
const connectMail = ()=>{
  transporter.verify(function(error,success){
    if(error)
    {
      console.log("Error in mail connection",error.message);
    }
    else 
    {
      console.log("Mail connected successfully");
    }
  })
}

const sendMail = async (title,email,body)=>{
  try 
  {
    const response = await transporter.sendMail({
      from : "amanjain2k20@gmail.com",
      to : email,
      subject : title,
      html : body,
    })

    return response;
  }
  catch(error)
  {
    console.log(error.message)
  }
}

module.exports = {transporter,connectMail,sendMail}