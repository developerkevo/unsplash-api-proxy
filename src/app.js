const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const limiter = rateLimit({
  windowMs: 30 * 1000,
  max: 2 // limit each IP to 100 requests per windowMs
});


const speedLimiter = slowDown({
  windowMs: 30 * 1000, // 15 minutes
  delayAfter: 100, // allow 100 requests per 15 minutes, then...
  delayMs: 500 // begin adding 500ms of delay per request above 100:

});


const app = express();
app.set('trust proxy', 1);
app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(limiter);
app.use(speedLimiter);


app.get('/', (req, res) => {
  res.json({
    message: 'Hello there'
  });
});


app.use('/api/v1', api);


app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
