// const mongoose = require('mongoose');
// mongoose.connect('mongodb+srv://manish:kumar@cluster0.5vaq2.mongodb.net/contactlist?retryWrites=true&w=majority');
// const db= mongoose.connection;


//changes from here
const mongoose = require('mongoose');
// const db = process.env.MONGODB_URI || 'mongodb+srv://manish:kumar@cluster0.5vaq2.mongodb.net/contactlist?retryWrites=true&w=majority';
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://manish:kumar@cluster0.5vaq2.mongodb.net/contactlist?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(() => {
    console.log(`connection successful`);
}).catch((err)=> console.log(`no connection`));





// db.on('error',console.error.bind(console,'error connecting to db'));
// db.once('open',function(){
//     console.log('successfully connected to database');
// });