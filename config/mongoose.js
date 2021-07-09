const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://manish:kumar@cluster0.5vaq2.mongodb.net/contactlist?retryWrites=true&w=majority');
const db= mongoose.connection;
db.on('error',console.error.bind(console,'error connecting to db'));
db.once('open',function(){
    console.log('successfully connected to database');
});