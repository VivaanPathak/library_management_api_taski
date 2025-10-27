const express = require('express');
const { body, param, query } = require('express-validator');
const router = express.Router();
const bookController = require('../controllers/bookController');
const runValidation = require('../middlewares/validation');

// Create
router.post(
  '/',
  [
    body('title').notEmpty().withMessage('title is required').isString().trim(),
    body('author').notEmpty().withMessage('author id is required').isMongoId(),
    body('pages').optional().isInt({ min: 0 }),
    body('publishedDate').optional().isISO8601().toDate()
  ],
  runValidation,
  bookController.createBook
);

// Get all (pagination supported via ?page=&limit=)
router.get(
  '/',
  [
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('limit').optional().isInt({ min: 1 }).toInt()
  ],
  runValidation,
  bookController.getBooks
);

// Search by author name: /api/books/search?q=tolkien
router.get('/search', [query('q').notEmpty().withMessage('q is required')], runValidation, bookController.searchBooksByAuthor);

router.get('/:id', [param('id').isMongoId()], runValidation, bookController.getBookById);

// Update
router.put(
  '/:id',
  [
    param('id').isMongoId(),
    body('title').optional().isString().trim(),
    body('author').optional().isMongoId(),
    body('pages').optional().isInt({ min: 0 }),
    body('publishedDate').optional().isISO8601().toDate()
  ],
  runValidation,
  bookController.updateBook
);

// Delete
router.delete('/:id', [param('id').isMongoId()], runValidation, bookController.deleteBook);

module.exports = router;
