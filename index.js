const express = require('express');
const path = require('path');
const port = process.env.PORT ||  8000;

const app = express();

//changes from here
const mongoose = require('mongoose');
const db = 'mongodb+srv://manish:kumar@cluster0.5vaq2.mongodb.net/contactlist?retryWrites=true&w=majority';
mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(() => {
    console.log(`connection successful`);
}).catch((err)=> console.log(`no connection`));


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


var contactList=[
    {
        name:"Manish",
        phone:"1111"
    },
    {
        name:"rohan",
        phone:"2326"
    },
    {
        name:"Raj",
        phone:"4546"
    }
]



app.get('/',function(req,res){
    
    return res.render('home',{
        title:"contacts list",
        contact_List: contactList
    });
});

app.get('/create',function(req,res){
    return res.render('createContact');
});







app.listen(port,function(err){
    if(err){
        console.log('error in running server ',err  );
    }
    console.log('yup my server is running on port',port);


});