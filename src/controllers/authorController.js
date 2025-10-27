const Author = require('../models/Author');

/**
 * Create an author
 */
exports.createAuthor = async (req, res, next) => {
  try {
    const { name, Description } = req.body;
    const author = new Author({ name, Description });
    await author.save();
    res.status(201).json(author);
  } catch (err) {
    next(err);
  }
};

/**
 * Get all authors (simple)
 */
exports.getAuthors = async (req, res, next) => {
  try {
    const authors = await Author.find().sort({ name: 1 });
    res.json(authors);
  } catch (err) {
    next(err);
  }
};

/**
 * Get single author by id
 */
exports.getAuthorById = async (req, res, next) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ error: 'Author not found' });
    res.json(author);
  } catch (err) {
    next(err);
  }
};
