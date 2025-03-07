const express = require('express');
const filerouter = express.Router();

const { fileUpload } = require('../config/cloudinary')
const { auth,isInstructor } = require('../middleware/auth')

filerouter.put('/fileupload',auth,isInstructor,fileUpload);

module.exports = filerouter;