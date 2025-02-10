const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 5500;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // replace with your MySQL username
    password: 'jomon27james', // replace with your MySQL password
    database: 'movieDB'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err.stack);
        return;
    }
    console.log('Connected to the database');
});

app.get('/search', (req, res) => {
    const query = req.query.query;
    const sql = `
        SELECT * FROM movies
        WHERE title LIKE ? OR director LIKE ? OR genre LIKE ?
    `;
    db.query(sql, [`%${query}%`, `%${query}%`, `%${query}%`], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
