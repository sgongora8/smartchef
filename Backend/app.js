const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');

dotenv.config();
require('./config/passport');

const app = express();
const PORT = process.env.PORT || 5000;

app.disable('etag');
app.use('/api', (req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.COOKIE_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    secure: false,            
    sameSite: 'lax',          
  }
}));




app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));


app.use('/api/auth',      require('./Routes/authRoutes'));
app.use('/api/users',     require('./Routes/userRoutes'));
app.use('/api/recipes',   require('./Routes/recipeRoutes'));
app.use('/api/nutrition', require('./Routes/nutritionRoutes'));
app.use('/api/ai',        require('./Routes/aiRoutes'));


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
