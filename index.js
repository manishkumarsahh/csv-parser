

//https://bookstore-nodework.herokuapp.com/getAllBooks
//heroku url



const express = require('express');
// const path = require('path');
// const { nextTick } = require('process');
const port = process.env.PORT ||  8000;

const app = express();

const db=require('./config/mongoose');

const Books = require('./models/books');


const db=require('./config/mongoose');
const csv = require('csv-parser')
const fs = require('fs')
const multer  = require('multer')
const uploads = multer({ dest: 'uploads/' })


app.use(express.urlencoded({extended:true}));
// app.use(express.static('assets'));


app.post("/upload-csv", uploads.single("csv"), (req, res) => {
    
   
    csv()
      .fromFile(req.file.path)
      .then((jsonObj) => {
        
        Books.create({ csvData: jsonObj}, { upsert: true }, (err, data) => {
          if (err) {
            res.status(400).json({
              message: "Something went wrong!",
            });
          } else {
            res.status(200).json({
              message: "File Uploaded Successfully!",
              result: data,
            });
          }
        });
      });
  });


//Add books to the database
app.post('/addBooks', async function(req,res){

    try{
        let bookLists = await Books.create({
            bookName:req.body.boonName,
            bookAuthor:req.body.bookAuthor,
        });
        res.status(200).send(bookLists);
    }catch(err){
        res.status(400).send('error');
         next();
    }

    
});

      
   //get all books
app.get('/getAllBooks', async function(req,res){

    try{
        let bookLists = '';
        setInterval( await function(){ 
            bookLists =  Books.find({}); 
        
        }, 3000);
        
        res.status(200).send('ok');
    }catch(err){
        res.status(400).send('error');
        
    }

    
});

      //get books by id
app.get('/getBookById', async function(req,res){

    try{
        let bookLists = await Books.find({_id:req.body.id});
        res.status(200).send(bookLists);
    }catch(err){
        res.status(400).send('error');
        next();
    }

    
});

      //delete books by id
app.delete('/deleteById', async function(req,res){

    try{
        let bookLists = await Books.findOneAndDelete({_id:req.body.id});
        res.status(200).send('deleted succesfully');
    }catch(err){
        res.status(400).send('error');
        next();
    }

    
});


//update books details by ids
app.put('/updateBookById', async function(req,res){

    try{
        let bookLists = await Books.findOneAndUpdate({_id:req.body.id},{
            bookName:req.body.boonName,
            bookAuthor:req.body.bookAuthor
        });
        res.status(200).send('updated');
    }catch(err){
        res.status(400).send('error');
         next();
    }

    
});




app.listen(port,function(err){
    if(err){
        console.log('error in running server ',err  );
    }
    console.log('yup my server is running on port',port);


});