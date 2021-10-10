const mongoose = require('mongoose');
//books schema 
const booksSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true
    },
    bookAuthor: {
        type:String,
        required:true
    }
    
},{
    timestamps:true
});

const Book = mongoose.model('Book', booksSchema);

module.exports = Book;
