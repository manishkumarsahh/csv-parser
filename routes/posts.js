//top 3 lines are exactly copied from users.js file of routes only
const express = require('express');
const router = express.Router();
const passport=require('passport');


//accesing the controller functionalities
const postsController = require('../controllers/posts_controller');


//calling the routers  
//this will simply call the module.exports.create wala part 
//which creates and stores the post in db 
router.post('/create', passport.checkAuthentication  ,postsController.create);


//router for deleting post
//if authenticated then only proceed happen
router.get('/destroy/:id', passport.checkAuthentication, postsController.destroy);


module.exports = router;