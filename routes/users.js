const express = require('express');
const router = express.Router();
const passport=require('passport');


const usersController = require('../controllers/users_controller');

//show the profile page only after the sign in is done or authenticated
router.get('/profile/:id', passport.checkAuthentication ,usersController.profile);

//update the profile after checking the user and profile page user
router.post('/update/:id', passport.checkAuthentication, usersController.update);



router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);


router.post('/create', usersController.create);

//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',             //strategy of passport
    {failureRedirect: '/users/sign-in'},    //if authentication fails then
) ,usersController.createSession);      //if authentication done then this function


//authenticate by passport google
//sending to google to authenticate
router.get('/auth/google',passport.authenticate('google',{ scope: ['profile','email'] }));

//if authenticated by google then callback will be
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/users/sign-in' } ), usersController.createSession );



//to log out or destroying session
router.get('/sign-out',usersController.destroySession);


module.exports = router;