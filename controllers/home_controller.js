const Post = require('../models/post');

//to show all the users on home screen
const User = require('../models/user');


//without async await
// module.exports.home = function(req, res){
//     // console.log(req.cookies);
//     // res.cookie('user_id', 25);

//     // Post.find({}, function(err,posts){
//     //     return res.render('home', {
//     //         title: "CodeSocial | Home",
//     //         //find all the posts from db and put it into context
//     //         posts:posts
//     //     });
//     // });
//     //populating the user of each post
//     //to access the user name and informations to print in home.ejs
//     //to access the whole user object from database
//     Post.find({})
//     .populate('user')
//     .populate({
//         path:'comments',
//         populate:{
//             path:'user'
//         }
//     })
//     .exec(function(err,posts){

//         //user.find is here to show all the user on home page
//         User.find({}, function(err, users){
//             return res.render('home', {
//                 title: "Codeial | Home",
//                 posts:  posts,
//                 all_users: users    //this all user will contain all users list
//             });
//         });

//     })




    
// }

//with async await
module.exports.home =async function(req, res){
    try{
         // console.log(req.cookies);
        // res.cookie('user_id', 25);

        // Post.find({}, function(err,posts){
        //     return res.render('home', {
        //         title: "CodeSocial | Home",
        //         //find all the posts from db and put it into context
        //         posts:posts
        //     });
        // });
        //populating the user of each post
        //to access the user name and informations to print in home.ejs
        //to access the whole user object from database
        let posts=await Post.find({})
        .sort('-createdAt')             //to sort posts created at latest
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        });
        
        //user.find is here to show all the user on home page
        let users=await User.find({})
        

        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts,
            all_users: users    //this all user will contain all users list
        });

    }catch{
        console.log('Error',err);
        return;
    }
   
    
}


// module.exports.actionName = function(req, res){}