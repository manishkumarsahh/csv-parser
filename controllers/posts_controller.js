const Post = require('../models/post');        //model of post is imported from mongoose
const Comment = require('../models/comment');

// module.exports.create = function(req,res){
    
//         Post.create({                   //post created
//             content: req.body.content,          //user input content put into post model content
//             user:req.user._id
//             //user id is linked who has created post
//         },function(err,post){
//             if(err){console.log('error in creating a post'); return;}
//             return res.redirect('back');
//         });
    
// }

//with async await
module.exports.create =async function(req,res){
    try{
        let post = await Post.create({                   //post created
            content: req.body.content,          //user input content put into post model content
            user:req.user._id
            //user id is linked who has created post
        });


        //for json response of ajax
        if (req.xhr){
            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            post = await post.populate('user', 'name').execPopulate();

            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }



        req.flash('success','Post published!')
        return res.redirect('back');
    }catch(err){
        console.log('Error',err);
        req.flash('error',err);

        return res.redirect('back');
    }
    

}



//for deleting comments
// module.exports.destroy = function(req, res){
//     Post.findById(req.params.id, function(err, post){
//         // .id means converting the object id into string
//         //checking deletion request ke user ka id and post creator ka id
//         if (post.user == req.user.id){
//             post.remove();
//             //all the comment of that post deleted
//             Comment.deleteMany({post: req.params.id}, function(err){
//                 return res.redirect('back');
//             });
//         }else{
//             return res.redirect('back');
//         }

//     });
// }


//with async await
//for deleting comments
module.exports.destroy =async function(req, res){

    try{
        let post =await Post.findById(req.params.id);

        // .id means converting the object id into string
        //checking deletion request ke user ka id and post creator ka id
        if (post.user == req.user.id){
            post.remove();
            //all the comment of that post deleted
            await Comment.deleteMany({post: req.params.id});

            if (req.xhr){                       //deleting using ajax
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }

            req.flash('success','post and associated comments deleted');
            return res.redirect('back');
        }else{
            req.flash('error','you can nt delete this post');
            return res.redirect('back');
        }
    }catch(err){
        // console.log('Error',err);
        // return ;

        req.flash('error',err);

        return res.redirect('back');
    }
   
}