const baseUrl = require('./src/base-url');
const request = require('request');

function getAllMovies() {
    request(`${baseUrl.BASE_URL}discover/movie?api_key=${baseUrl.API_KEY}`, { json: true }, (err, res, body) => {
      if (err) { return console.log(err); }

      const data = body.results.map(b => {
          return {
              title: b.title,
              overview: b.overview
          }
      });

      insertOnHTML(data);
    });
}

getAllMovies();