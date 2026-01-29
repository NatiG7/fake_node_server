// Nati G.

// nodeJs server
require('dotenv').config;
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const app = express();
const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes');
const pageGuard = require('./middleware/pageGuard');
const port = 3000;

app.use(express.json());
app.use(cors());

// session config
app.use(session({
    secret: process.env.SECRET_KEY || 'default_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60,
        httpOnly: true
    }
}))

// page guard allows static only if auth
app.use(pageGuard);
app.use(express.static('frontend'));

app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
