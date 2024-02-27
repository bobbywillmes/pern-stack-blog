const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const pool = require('./config/db'); // Import the database connection
app.use(express.json());

// Get all posts
app.get('/posts', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
      res.json(rows);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Create a new post
  app.post('/posts', async (req, res) => {
    console.log('POST /post request')
    console.log(req.query);
    try {
      const { title, content, author } = req.query;
      const { rows } = await pool.query(
        'INSERT INTO posts (title, content, author) VALUES ($1, $2, $3) RETURNING *',
        [title, content, author]
      );
      res.status(201).json(rows[0]);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

app.get('/message', (req, res) =>{
    res.send('Hello from the backend :) Back here Node.js is running the entire show.');
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})