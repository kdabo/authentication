const express = require('express');
const http = require('http');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

// DB SETUP
mongoose.connect('mongodb://localhost:27017/authentication', { useNewUrlParser: true });

// APP SETUP
// morgan and body parser are middlewares in express.
// any incoming request into the server is going to be passed to morgan and bodyparser
// morgan is loging framework which is used to log incoming server requests
// bodyparser is parsing incoming request, specifically json
app.use(morgan('combined'));
app.use(bodyparser.json({ type: '*/*' }));
router(app);

// Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);

server.listen(port);
console.log('Server listening on port: ', port);