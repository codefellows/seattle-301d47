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
app.get('/', replaceWithRealRequestHandler);
app.post('/searches', replaceWithRealRequestHandler);
app.get('/searches/new', replaceWithRealRequestHandler);
app.post('/books', replaceWithRealRequestHandler);
app.get('/books/:id', replaceWithRealRequestHandler);
app.put('/books/:id', replaceWithRealRequestHandler);
app.delete('/books/:id', replaceWithRealRequestHandler);
app.get('*', replaceWithRealRequestHandler);


// Helper functions
function replaceWithRealRequestHandler(request, response) {
  response.send('Needs to be replaced with real request handler per route');
}
