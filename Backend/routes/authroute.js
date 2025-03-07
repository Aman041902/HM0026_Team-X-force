const express = require('express');
const router = express.Router();

const { signup,login ,getUserData} = require('../controller/signup')
const {auth,isStudent,isInstructor,isAdmin} = require('../middleware/auth');
const { getLeaderBoard, getVideos, videoIsClicked, watchHistory } = require('../controller/student');
const { addCourse, getPlaylists, addVideo, getInstructorVideo } = require('../controller/instructor');
const { getInstructors, flagVideos } = require('../controller/admin');
const { fileUpload } = require('../config/cloudinary')

// landing page (done)
router.put('/signup',signup);
router.post('/login',login);

// Student feed (done)
router.post('/getvideos', auth, isStudent, getVideos);
router.post('/videoisclicked', auth, isStudent, videoIsClicked)

// student dashboard (done)
router.post('/getuserdata/student',auth, isStudent, getUserData);
router.post('/leaderboard', auth, isStudent, getLeaderBoard);
router.post('/watchhistory', auth, isStudent, watchHistory);
// add your learning journey
// add recommedation route using ML

// Instructor dashboard (done)
router.post('/getuserdata/instructor', auth , isInstructor, getUserData);
router.post('/getinstructorvideo', auth, isInstructor, getInstructorVideo)

// Instrutor add video (done)
router.post('/addvideo', auth, isInstructor, fileUpload)
 
// Admin routes
router.post('/getuserdata/admin', auth, isAdmin, getUserData);
router.post('/getinstructors', auth, isAdmin, getInstructors);
router.post('/flagvideos', auth, isAdmin, flagVideos);

module.exports = router;
