const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  summary: { type: String, default: '' },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
  publishedDate: { type: Date },
  pages: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
