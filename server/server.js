require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use("/api/materials", require("./routes/material"));
app.use("/api/requirements", require("./routes/requirement"));
app.use("/api/interactions", require("./routes/interaction"));

// simple protected test route
const auth = require('./middleware/auth');
app.get('/api/protected', auth, (req, res) => {
  // req.user set by middleware
  res.json({ ok: true, message: 'protected', user: req.user });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
