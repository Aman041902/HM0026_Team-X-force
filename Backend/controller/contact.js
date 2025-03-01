const {sendMail} = require('../config/mailer')

exports.contact = async (req,res)=>{
    try 
    {
        const {title,email,body} = req.body;
        const response = await sendMail(title,email,body);

        return response;
    }
    catch(error)
    {
        console.log(error.message);
    }
}

