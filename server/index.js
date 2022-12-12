// Load variabel .env ketika development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');

const app = express();
const cookieParser = require('cookie-parser');
// import library passport
const passport = require('./src/lib/passport');
// import Cors
const cors = require('cors');

const PORT = process.env.PORT || 8000;

// Middleware json untuk membaca request body bertipe json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware untuk cookie parser
app.use(cookieParser());

// Middleware passport
app.use(passport.initialize());

// Cors
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

// Middleware router
const router = require('./src/routers');
app.use(router);

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
