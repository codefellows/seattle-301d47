'use strict';

const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const pg = require('pg');

require('dotenv').config();

const PORT = process.env.PORT;

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

const app = express();

app.use(cors());

app.get('/location', (request,response) => {
  getLocation(request.query.data)
    .then( locationData => response.send(locationData) )
    .catch( error => handleError(error, response) );
});

app.get('/weather', getWeather);

function handleError(err, res) {
  console.error('ERR', err);
  if (res) res.status(500).send('Sorry, something went wrong');
}

app.listen(PORT, () => console.log(`App is up on ${PORT}`) );

//  ---------- LOCATION ---------------- //

function Location(query,data) {
  this.search_query = query;
  this.formatted_query = data.formatted_address;
  this.latitude = data.geometry.location.lat;
  this.longitude = data.geometry.location.lng;
}




function getLocation(query) {

  // What must we do to cache the API results ...
  // Do we already have this in the database?
  //    If so, Return it to the client
  // If not
  //    Go to google and get it
  //    Add it to the database
  //    Return it to the client

  const SQL = `SELECT * FROM locations WHERE search_query=$1;`;
  const values = [query];

  return client.query(SQL, values)
    .then(result => {
      if(result.rowCount > 0) {
        console.log('From SQL');
        return result.rows[0];
      } else {
        const _URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${process.env.GEOCODE_API_KEY}`;
        return superagent.get(_URL)
          .then( data => {
            console.log('FROM API');
            if ( ! data.body.results.length ) { throw 'No Data'; }
            else {
              let location = new Location(query, data.body.results[0]);
              let NEWSQL = `INSERT INTO locations (search_query,formatted_query,latitude,longitude) VALUES($1,$2,$3,$4)`;
              let newValues = Object.values(location);
              return client.query(NEWSQL, newValues)
                .then( () => location )
let NEWSQL = `INSERT INTO locations (search_query,formatted_query,latitude,longitude) VALUES($1,$2,$3,$4) RETURNING id`;
              let newValues = Object.values(location);
              return client.query(NEWSQL, newValues)
                .then( results => {
                  location.id = results.rows[0[.id;
                  return location;
                )
                .catch( console.error );
            }
          });
      }
    })
    .catch(console.error);
}



//  ---------- WEATHER ---------------- //
function Weather(day) {
  this.forecast = day.summary;
  this.time = new Date(day.time * 1000).toString().slice(0, 15);
}

function getWeather(request, response) {

  const _URL = `https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${request.query.data.latitude},${request.query.data.longitude}`;

  return superagent.get(_URL)
    .then(result => {

      const weatherSummaries = [];

      result.body.daily.data.forEach(day => {
        const summary = new Weather(day);
        weatherSummaries.push(summary);
      });

      response.send(weatherSummaries);

    })
    .catch(error => handleError(error, response));
}








