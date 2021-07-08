const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,    //by object id user is denoted
        ref: 'User'                             //from user schema 
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,    //by objectid post identified
        ref: 'Post'                             //from post schema
    }
},{
    timestamps:true
});

const Comment= mongoose.model('Comment',commentSchema);
module.exports=Comment;
