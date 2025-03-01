const mongoose = require("mongoose");
const {sendMail} = require('../config/mailer');

const schema = new mongoose.Schema({
  email: String,
  otp: Number,
  createdat: {
    type: Date,
    default: Date.now,
    expires: 5 * 60,
  },
});

module.exports = mongoose.model("Otp", schema);

async function sendVerificationMail(emaill,otp)
{
  try 
  {
    const response = await sendMail("Here is verification otp ",email,`otp is ${otp}`)
  }
  catch(error)
  {
    console.log(error.message);
  }
}

schema.pre('save',async function(next){
  const response = await sendVerificationMail(this.email,this.otp);
  next();
})