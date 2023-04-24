const express = require('express');
const app = express();
const mongoose = require('mongoose');
const allRoutes = require('./routes/allRoutes');
const PORT = process.env.PORT || 3000

// Database connection
mongoose.connect('mongodb://127.0.0.1:27017/blogApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Body-parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/posts', allRoutes);

// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
