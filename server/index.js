const express = require('express'); // touch 2
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const languageRoutes = require('./routes/languages');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');

app.use('/api/languages', languageRoutes);
app.use('/api/auth', authRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.send('CoderHub API is running');
});

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/coderhub')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
