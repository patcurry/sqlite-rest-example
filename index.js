const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const upload = multer();

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

//Require the Router we defined in movies.js
const scidata = require('./app/scidata.js');
const movies = require('./app/movies.js');

//Use the Router on the sub route /movies
app.use('/movies', movies);
app.use('/scidata', scidata);

app.listen(3000);
