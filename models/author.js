const mongoose = require("mongoose");
const Book = require('./book');

const AuthorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

AuthorSchema.pre('remove', function(next){
  Book.find({ author: this.id }, (err, books) => {
    if(err) next(err);
    else if(books.length > 0) next(new Error('This author still has books'));
    else next();
  });
})

const Author = mongoose.model("Author", AuthorSchema);

module.exports = Author;
