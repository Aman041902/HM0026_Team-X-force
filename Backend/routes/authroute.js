const express = require('express');
const router = express.Router();

const { signup,login ,getUserData} = require('../controller/signup')
const {auth,isStudent,isInstructor,isAdmin} = require('../middleware/auth');
const { getLeaderBoard, getVideos, videoIsClicked, watchHistory,getVideoById,searchVideos,getUserCount } = require('../controller/student');
const { getInstructorVideo } = require('../controller/instructor');
const { getPendingVideo, flagVideos } = require('../controller/admin');
const { fileUpload } = require('../config/cloudinary')

// landing page (done)
router.put('/signup',signup);
router.post('/login',login);

// Student feed (done)
router.post('/getvideos', auth, isStudent, getVideos);
router.post('/admin/getvideos', auth, isAdmin, getVideos);
router.post('/videoisclicked', auth, isStudent, videoIsClicked);
router.post('/feed/:id',auth,isStudent,getVideoById); 
router.post('/feed/getvideo/search',auth,isStudent,searchVideos);

// student dashboard (done)
router.post('/getuserdata/student',auth, isStudent, getUserData);
router.post('/leaderboard', auth, isStudent, getLeaderBoard);
router.post('/watchhistory', auth, isStudent, watchHistory);
router.get('/getuserdata',getUserCount);
// add your learning journey
// add recommedation route using ML

// Instructor dashboard (done)
router.post('/getuserdata/instructor', auth , isInstructor, getUserData);
router.post('/getinstructorvideo', auth, isInstructor, getInstructorVideo)

// Instrutor add video (done)
router.post('/addvideo', auth, isInstructor,fileUpload)
router.post('/getpendingvideo',auth,isAdmin,getPendingVideo)

// Admin routes
router.post('/getuserdata/admin', auth, isAdmin, getUserData);
router.post('/flagvideos', auth, isAdmin, flagVideos);

module.exports = router;
