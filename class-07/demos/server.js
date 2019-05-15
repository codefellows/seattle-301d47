'use strict';

// application dependencies
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');

// configure environment variables
require('dotenv').config();

const app = express();

const PORT = process.env.PORT;

app.use(cors());

// Move the logic to the searchToLatLong function, below
app.get('/location', searchToLatLong);

app.get('/weather', getWeather);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));


// ERROR HANDLER
function handleError(err, res) {
  console.error(err);
  if (res) res.status(500).send('Sorry, something went wrong');
}


// HELPER FUNCTIONS

// Solution from day 6
// function searchToLatLong(query) {
//   const geoData = require('./data/geo.json');
//   const location = new Location(geoData);
//   location.search_query = query;
//   console.log(location);
//   return location;
// }

function searchToLatLong(request, response) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${request.query.data}&key=${process.env.GEOCODE_API_KEY}`;

  return superagent.get(url)
    .then(res => {
      response.send( new Location(request.query.data, res));
    })
    .catch(error => handleError(error));

}

// Start with this, then refactor the .forEach to .map
// function getWeather(request, response) {
//   const url = `https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${request.query.data.latitude},${request.query.data.longitude}`;
//   console.log('url', url);

//   return superagent.get(url)
//     .then(result => {
//       const weatherSummaries = [];

//       result.body.daily.data.forEach(day => {
//         const summary = new Weather(day);

//         weatherSummaries.push(summary);
//       });

//       response.send(weatherSummaries);
//     })
//     .catch(error => handleError(error, response));
// }

function getWeather(request, response) {
  const url = `https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${request.query.data.latitude},${request.query.data.longitude}`;

  return superagent.get(url)
    .then(result => {
      const weatherSummaries = result.body.daily.data.map(day => {
        return new Weather(day);
      });

      response.send(weatherSummaries);
    })
    .catch(error => handleError(error, response));
}

function Location(query, res) {
  this.search_query = query;
  this.formatted_query = res.body.results[0].formatted_address;
  this.latitude = res.body.results[0].geometry.location.lat;
  this.longitude = res.body.results[0].geometry.location.lng;
}


function Weather(day) {
  this.forecast = day.summary;
  this.time = new Date(day.time * 1000).toString().slice(0, 15);
}
