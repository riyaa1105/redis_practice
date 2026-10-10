
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    bookId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Technology', 'Fiction'],
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    availableCopies: {
      type: Number,
      required: true,
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: 'books',
  }
);

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
