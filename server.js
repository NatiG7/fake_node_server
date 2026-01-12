// Programmer Name:

const express = require('express');
const cors = require('cors');
const db = require('./db/dbSingleton');
const pool = db.getConnection();
const app = express();
const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes');
const port = 3000;

app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);
app.use(express.static('frontend'));

app.get('/test-db', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT 1 as result');

        res.json({
            status: 'success',
            message: 'DB Connected',
            test_res: rows[0].result
        });
    }
    catch (error) {
        console.error("Database Connection Failed:", error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to connect to DB',
            error: error.message
        });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
