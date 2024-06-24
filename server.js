const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./database/db');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', (req, res) => {
    res.render('index');
});

// Enroll route
app.get('/enroll', (req, res) => {
    res.render('enroll');
});

// Handle form submission
app.post('/enroll', (req, res) => {
    const { name, email } = req.body;
    db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err) => {
        if (err) {
            console.error(err.message);
            res.send("There was an error enrolling.");
        } else {
            res.send("Enrollment successful!");
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
