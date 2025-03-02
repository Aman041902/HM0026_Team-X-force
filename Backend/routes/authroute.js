const express = require('express');
const router = express.Router();

const { signup,login ,getUserData} = require('../controller/signup')
const {auth,isStudent,isInstructor,isAdmin} = require('../middleware/auth')

router.put('/signup',signup);
router.post('/login',login);
router.post('/getuserdata',auth,isStudent,getUserData);

module.exports = router;