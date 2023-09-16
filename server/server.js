const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

const DB_URI = "YOUR_MONGODB_URI";  // e.g. "mongodb://localhost:27017/mydatabase"

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));


app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
