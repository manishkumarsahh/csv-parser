const passport = require('passport');


//importing the strategy and extracting a module which will help us extarct jwt from header
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const env = require('./config.env');

//we will use user model for authentication 
//to establish the identity we will need user model
const User = require('../models/user');

//we need to encrypt key so to encrypt

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.jwt_secret
}

//will just check the user is present or not 
//because jwt will only contain the key


passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){

    User.findById(jwtPayLoad._id, function(err, user){
        if (err){console.log('Error in finding user from JWT'); return;}

        if (user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    })

}));

module.exports = passport;
