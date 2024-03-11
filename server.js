const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const pool = require('./config/db'); // Import the database connection
const cors = require('cors');
const { faker } = require('@faker-js/faker');
const { getOppositeColor, capitalizeEveryWord, consoleLineNumbers } = require('./utils/utils')

// add console.log source filename & line number in Node command line
consoleLineNumbers()

// middleware ---
app.use(express.json());
app.use(cors());

// Get all posts
app.get('/api/posts', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

  // Create a new post
app.post('/api/posts', async (req, res) => {
  //      React sends params through req.body
  // API http-request params through req.query
  try {
    let { title, content, author } = req.body;
    // get title, content & author from req.body if length > 0, else get them from req.query
    if(req.body && Object.keys(req.body).length > 0) {
      ({ title, content, author } = req.body)
    } else {
      ({ title, content, author } = req.query)
    }

    const { rows } = await pool.query(
      'INSERT INTO posts (title, content, author) VALUES ($1, $2, $3) RETURNING *',
      [title, content, author]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(400).json({ err });
  }
});

// Get a post by :id
app.get('/api/posts/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const { rows } = await pool.query(
      'SELECT * FROM posts WHERE id = $1',
      [id]
    );
    if(rows.length == 0) {
      return res.status(404).json({ message: 'Post not found.'})
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a post by :id
app.put('/api/posts/:id', async (req, res) => {
  // console.log('app.put   /api/posts/:id   ---------- ');

  // initialize post id & request params object
  const id = req.params.id;   // 27
  let params;                 // {}

  // get params from request Object.keys from req.body (browser) or req.query (api query params)
  if(Object.keys(req.body).length > 0) {
    params = req.body;  // from browser
    // console.log('params from browser:', params);
  } 
  else if(Object.keys(req.query).length > 0) {
    params = req.query; // from API
    // console.log('params from API:', params);
  } 
  else {
    return res.status(400).json({
      message: 'No parameters provided to update the post.'
    })
  }

  // console.log(params);    

//  params = {title: 'An Updated Title', content: 'In a world..'}
//  An update arrives as a JSON object with fields to update as params(see object above)
//  Loop through each property (key: 'Value') by Object.keys(params).forEach (below), the keys(properties) build the QUERY and the values build the PARAMS
//  These two build the SQL query to update the db   (via: await pool.query  see below)
//   QUERY  || UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *
//   PARAMS || [ 'An Updated Title', 'In a world..', '60' ]

  // inital values
  let updateQuery = 'UPDATE posts SET';   // the query
  let queryParams = [];                   // the values
  let queryCount = 1;                     // keep count

  // loop through param objects - to build query & get params
  Object.keys(params).forEach(param => {
    let key = param;            // title
    let value = params[key];    // 'An Updated Title'
    // console.log(key, ':', value);
    let seperator = queryCount > 1 ? ',' : '';  // comma seperator between values
    updateQuery += `${seperator} ${key} = $${queryCount}`;
    queryParams.push(value);
    queryCount++;
  })

  updateQuery  += ` WHERE id = $${queryCount} RETURNING * `;    // finish off the query with a WHERE to match for id & return all rows
  queryParams.push(id);

  // console.log('updateQuery:', updateQuery);   //  UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *
  // console.log('queryParams:', queryParams);   //  [ 'An Updated Title', 'In a world...', '60' ]


// try to update the db via pool.query using updateQuery & queryParams, or return errors
  try {
    const { rows } = await pool.query(updateQuery, queryParams);

    if (rows.length > 0) {
        res.status(200).json({
            message: 'Post updated successfully',
            post: rows[0] // Return the updated post
        });
    } else {
        res.status(404).send('Post not found');
    }
} catch (err) {
    res.status(500).json({ message: err.message });
}
});

// Delete a post by :id
app.delete('/api/posts/:id', async (req, res) => {
  const id = req.params.id;
  try {
      const { rowCount } = await pool.query('DELETE FROM posts WHERE id = $1', [id]);

      if (rowCount > 0) {
        res.status(204).send('Post deleted successfully');
      } else {
          return res.status(404).send('Post not found');
      }
  } catch (err) {
      return res.status(500).json({ message: err.message });
  }
});
  
app.get('/api/message', (req, res) =>{
    res.send('Hello from the backend :) Back here Node.js is running the entire show.');
})

app.get('/api/faker', (req, res) => {
  let response = undefined;
  // people
  let people = [];
  for (let i = 0; i < 40; i++) {
    let person = {
      name: faker.person.fullName(),
      jobType: faker.person.jobType(),
      jobTitle: faker.person.jobTitle(),
      country: faker.location.country()
  }
    people.push(person);
  }
  // dogs
  let dogs = [];
  for(let i = 0; i < 100; i ++) {
    let dog = faker.animal.dog();
    dogs.push(dog)
  }
  // colors
  let colors = [];
  for(let i = 0; i < 20; i++) {
    let color = faker.color.rgb();
    let opposite = getOppositeColor(color);
    colors.push({color, opposite})
  }
  // hacker log
  let hackerLog = [];
  for(let i = 0; i < 10; i++) {
    let event = {
      task: faker.hacker.verb() + ' ' + faker.hacker.adjective() + ' ' + faker.hacker.noun(),
      info: faker.hacker.phrase()
    }
    hackerLog.push(event);
  }
  // lorem-type to fill new Post fields
  let loremBlogs = [];
  for(let i = 0; i < 10; i++) {
    const titleLen = Math.floor(Math.random() * 5) + 3;
    const descLen = Math.floor(Math.random() * 15) + 1;
    const nameLen = Math.floor(Math.random() * 2) + 2;
    let entry = {
      title: capitalizeEveryWord(faker.lorem.words(titleLen)),
      content: faker.lorem.paragraphs(descLen),
      author: capitalizeEveryWord(faker.lorem.words(nameLen))
    }
    loremBlogs.push(entry);
  }


  response = {
    colors,
    people,
    dogs,
    hackerLog,
    loremBlogs
  }

  res.send(response);
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
