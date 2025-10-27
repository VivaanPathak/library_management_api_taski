const Book = require('../models/Book');
const Author = require('../models/Author');

/**
 * Create book
 */
exports.createBook = async (req, res, next) => {
  try {
    const { title, summary,  author: authorId, publishedDate, pages } = req.body;

    // ensure author exists
    const author = await Author.findById(authorId);
    if (!author) return res.status(400).json({ error: 'Author does not exist' });

    const book = new Book({
      title,
      summary,
      author: authorId,
      publishedDate,
      pages
    });

    await book.save();

    // populate author details before returning
    await book.populate('author').execPopulate?.() || await book.populate('author');

    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
};

/**
 * View all books (with optional pagination)
 * Query params: page, limit
 */
exports.getBooks = async (req, res, next) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);

    if (page < 1) page = 1;
    if (limit < 1) limit = 10;

    const skip = (page - 1) * limit;

    const [total, books] = await Promise.all([
      Book.countDocuments(),
      Book.find()
        .populate('author')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
    ]);

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      limit,
      data: books
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Search books by author name (partial, case-insensitive)
 * Query param: q (author name)
 */
exports.searchBooksByAuthor = async (req, res, next) => {
  try {
    const q = (req.query.q || '').trim();
    if (!q) return res.status(400).json({ error: 'Query param q is required' });

    // Find authors matching the name
    const authors = await Author.find({ name: { $regex: q, $options: 'i' } }).select('_id');
    if (authors.length === 0) return res.json({ total: 0, data: [] });

    const authorIds = authors.map(a => a._id);

    const books = await Book.find({ author: { $in: authorIds } }).populate('author');

    res.json({ total: books.length, data: books });
  } catch (err) {
    next(err);
  }
};

/**
 * Update book by id
 */
exports.updateBook = async (req, res, next) => {
  try {
    const updates = req.body;
    // If author is provided, make sure it exists
    if (updates.author) {
      const author = await Author.findById(updates.author);
      if (!author) return res.status(400).json({ error: 'Author does not exist' });
    }

    const book = await Book.findByIdAndUpdate(req.params.id, updates, { new: true }).populate('author');
    if (!book) return res.status(404).json({ error: 'Book not found' });

    res.json(book);
  } catch (err) {
    next(err);
  }
};

/**
 * Delete book by id
 */
exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json({ message: 'Book deleted' });
  } catch (err) {
    next(err);
  }
};

/**
 * Get single book
 */
exports.getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id).populate('author');
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    next(err);
  }
};
