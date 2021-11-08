 

//establishing connection with mongoose
const mongoose = require('mongoose');
const db = process.env.MONGODB_URI || 'mongodb+srv://manish:fleo123@cluster0.ebci7.mongodb.net/assignmentnode?retryWrites=true&w=majority';
mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(() => {
    
    console.log(`connection successful`);
}).catch((err)=> console.log(`no connection`));




 