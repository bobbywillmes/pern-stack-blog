const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/message', (req, res) =>{
    res.send('Hello from the backend :) Back here Node.js is running the entire show.');
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})