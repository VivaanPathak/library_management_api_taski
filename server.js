require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./src/config/db');

const authorRoutes = require('./src/routes/authors');
const bookRoutes = require('./src/routes/books');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());
//here use it for logging api requests //can use tiny dev anything for logging format
app.use(morgan('tiny'));

app.get('/', (req, res) => res.send({ message: 'Library API is running' }));

app.use('/api/authors', authorRoutes);
app.use('/api/books', bookRoutes);

// basic error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
