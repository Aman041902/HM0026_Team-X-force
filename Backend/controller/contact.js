const {sendMail} = require('../config/mailer')

exports.contact = async (req,res)=>{
    try 
    {
        const {title,email,body} = req.body;
        const response = await sendMail(title,email,body);

        console.log(title,email,body,response)
        return res.status(200).json({
            success : true,
            message : "Mail sent successfully here",
            data : response
        }); 
    }
    catch(error)
    {
        console.log(error.message);
    }
}

