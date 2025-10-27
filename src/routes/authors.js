const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const authorController = require('../controllers/authorController');
const runValidation = require('../middlewares/validation');

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('name is required').isString().trim(),
    body('Description').optional().isString(),
  ],
  runValidation,
  authorController.createAuthor
);

router.get('/', authorController.getAuthors);
router.get('/:id', [param('id').isMongoId()], runValidation, authorController.getAuthorById);

module.exports = router;
