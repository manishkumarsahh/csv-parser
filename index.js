const express = require('express');
const env = require('./config/config.env');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 8000;
const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');   




//after passport installation
//used for session cookie 
const  session = require('express-session');
const passport=require('passport');
const passportLocal = require('./config/passport-local-strategy');
//till here after passport installation

const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

var bodyParser = require('body-parser');

const flash = require('connect-flash');
const customMware = require('./config/middleware');

const path = require('path');

//const MongoStore = require ('connect-mongo');
//to store the current session which is running
//mongo  store is used for storing current server cookie so that 
//user dont gets signed out or server restart after every refreshing of page
//disabling this functionality syntax is too much changed

//const sassMiddleware = require('node-sass-middleware');

// app.use(sassMiddleware({
//     src: '/assets/scss'
// }));


app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static(env.asset_path));

//to make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


//after passport installation
//to encrypt the session cookie
app.use(session({
    name:'codeial',
    //todo change the secret before deployment in production mode
    secret:'env.session_cookie_key',
    saveUninitialised:false,    //when user not logged in no need to store data 
    resave:false,       //when identity is established users data in session cookie
                        //do i want to rewrite it even it is not channged
    cookie:{
        maxAge: (1000*60*100)
    }
    // store:  MongoStore.create(
    //     {                               //from here mongo store 
    //         mongoUrl: db._connectionString,
    //          //db is imported above from mongoose which is connected to database
    //         autoRemove:'disabled'
    //     },
    //     //if the connection is not established betwn database and db
    //     function(err){
    //         console.log(err || ' connect mongodb setup ok ');
    //     }
       
    // )
    //disabled this because of syntax change after update
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//this uses session cookie so put it after session
app.use(flash());
//using flash middleware
app.use(customMware.setFlash);


//router should must be placed agter passport initialization
// use express router
app.use('/', require('./routes'));

if(process.env.NODE_ENV == "production") {
    app.use(express.static("./routes"));
}



app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
