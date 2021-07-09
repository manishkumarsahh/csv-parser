const express = require('express');
const path = require('path');
const port = process.env.PORT ||  8000;
const app = express();


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





app.listen(port,function(err){
    if(err){
        console.log('error in running server ',err  );
    }
    console.log('yup my server is running on port',port);


});