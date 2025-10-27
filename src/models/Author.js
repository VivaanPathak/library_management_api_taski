const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  Description: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Author', authorSchema);
