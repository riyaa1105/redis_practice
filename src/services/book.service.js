const Book = require('../models/book.model');

async function runBookExamples() {
  try {
    console.log('\n=== Q2(d) Validation Test ===');

    // Q2(d): Try invalid document with availableCopies = -1
    try {
      const invalidBook = new Book({
        bookId: 'TEST01',
        title: 'Invalid Book',
        author: 'Test Author',
        category: 'Technology',
        price: 100,
        availableCopies: -1, // invalid
        isActive: true,
      });

      await invalidBook.save();
    } catch (validationError) {
      console.log('Validation error caught successfully:');
      console.log(validationError.message);
    }

    console.log('\n=== Q3(A) Insert 5 Records ===');

    const booksToInsert = [
      {
        bookId: 'B01',
        title: 'MongoDB Basics',
        author: 'A. Shah',
        category: 'Technology',
        price: 450,
        availableCopies: 3,
        isActive: true,
      },
      {
        bookId: 'B02',
        title: 'Node.js Guide',
        author: 'R. Mehta',
        category: 'Technology',
        price: 650,
        availableCopies: 0,
        isActive: true,
      },
      {
        bookId: 'B03',
        title: 'The River',
        author: 'N. Patel',
        category: 'Fiction',
        price: 300,
        availableCopies: 4,
        isActive: false,
      },
      {
        bookId: 'B04',
        title: 'Web Development',
        author: 'K. Rao',
        category: 'Technology',
        price: 550,
        availableCopies: 2,
        isActive: true,
      },
      {
        bookId: 'B05',
        title: 'Short Stories',
        author: 'M. Desai',
        category: 'Fiction',
        price: 250,
        availableCopies: 5,
        isActive: true,
      },
    ];

    const insertedBooks = await Book.insertMany(booksToInsert);
    console.log('Inserted books:');
    console.log(insertedBooks);

    console.log('\n=== Q3(B)(a) Display All Books ===');
    const allBooks = await Book.find();
    console.log(allBooks);

    console.log('\n=== Q3(B)(b) Display Technology books sorted by price ascending ===');
    const techBooks = await Book.find({ category: 'Technology' }).sort({ price: 1 });
    console.log(techBooks);

    console.log('\n=== Q3(B)(c) Display only books that can currently be issued ===');
    const issuableBooks = await Book.find({
      isActive: true,
      availableCopies: { $gte: 1 },
    });
    console.log(issuableBooks);

    console.log('\n=== Q3(C)(a) Update B03 price to 320 and display updated book ===');
    const updatedB03 = await Book.findOneAndUpdate(
      { bookId: 'B03' },
      { price: 320 },
      { new: true, runValidators: true }
    );
    console.log(updatedB03);

    console.log('\n=== Q3(C)(b) Issue one copy of B01 by reducing availableCopies by 1 ===');
    const updatedB01 = await Book.findOneAndUpdate(
      { bookId: 'B01' },
      { $inc: { availableCopies: -1 } },
      { new: true, runValidators: true }
    );
    console.log(updatedB01);

    console.log('\n=== Q3(D)(a) Delete B02 using bookId and verify deletion ===');
    await Book.deleteOne({ bookId: 'B02' });

    const deletedCheck = await Book.findOne({ bookId: 'B02' });
    if (!deletedCheck) {
      console.log('B02 successfully deleted. Record no longer exists.');
    } else {
      console.log('B02 still exists:', deletedCheck);
    }
  } catch (error) {
    console.error('Operation failed:', error);
    throw error;
  }
}

module.exports = { runBookExamples };
