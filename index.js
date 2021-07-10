const express = require('express');
const path = require('path');
const port = process.env.PORT ||  8000;

const app = express();

const db=require('./config/mongoose');
const Contact = require('./models/contact');



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



app.get('/', function(req, res){
    // console.log(__dirname);

    Contact.find({}, function(err, contacts){
        if(err){
            console.log("Error in fetching contacts from database.");
            return;
        }
        return res.render('home', { 
            title: "My Contact List",
            contact_list: contacts
        });
    });

   
});

app.get('/create',function(req,res){
    return res.render('createContact');
});



app.post('/create-contact', function(req, res){

    

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){
            console.log("Error in creating a contact.");
            return;
        }
        console.log('New Contact ==>', newContact);
        return res.redirect('back');
    });

   

});







app.listen(port,function(err){
    if(err){
        console.log('error in running server ',err  );
    }
    console.log('yup my server is running on port',port);


});