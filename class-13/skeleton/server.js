'use strict'

// Environment variables
require('dotenv').config();

// Application Dependencies
const express = require('express');
const pg = require('pg');
const superagent = require('superagent');
const methodOverride = require('method-override');

// Application Setup
const app = express();
const PORT = process.env.PORT || 3000;

// Express middleware
// Utilize ExpressJS functionality to parse the body of the request
app.use(express.urlencoded({extended: true}));
// Specify a directory for static resources
app.use(express.static('./public'));

// This middleware allows a POST to be converted to intended to desired HTTP method
// E.g. allows DElETE or PUT from HTML form 
// https://github.com/expressjs/method-override
app.use(methodOverride((request, response) => {
  if (request.body && typeof request.body === 'object' && '_method' in request.body) {
    // look in urlencoded POST bodies and delete it
    let method = request.body._method;
    delete request.body._method;
    return method;
  }
}))

// Database Setup
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

// Set the view engine for server-side templating
app.set('view engine', 'ejs');

// listen for requests
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

// API Routes
app.get('/', getBooks);
app.post('/searches', doSearch);
app.get('/searches/new', newSearch);
app.post('/books', createBook);
app.get('/books/:id', getBook);
app.put('/books/:id', updateBook);
app.delete('/books/:id', deleteBook);
app.get('*', (request, response) => response.status(404).send('This route does not exist'));


// Request Handlers
function getBooks(request, response) {
  response.send('getBooks');
}

function doSearch(request, response) {
  response.send('doSearch');
}

function newSearch(request, response) {
  response.send('newSearch');
}

function createBook(request, response) {
  response.send('createBook');
}

function getBook(request, response) {
  response.send('getBook');
}

function updateBook(request, response) {
  response.send('updateBook');
}

function deleteBook(request, response) {
  response.send('deleteBook');
}

// Helper Functions


