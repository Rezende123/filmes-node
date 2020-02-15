const baseUrl = require('./src/base-url');
const request = require('request');
const ejs = require('ejs');
const fs = require('fs');
const htmlFile = '/home/felipe/Documentos/GIT/filmes-node/src/view.html';

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

function insertOnHTML(data) {
    ejs.renderFile('./src/layout.ejs', {data}, function(err, html){
        if (html) {
            var stream = fs.createWriteStream(htmlFile);

            stream.once('open', function(fd) {
                stream.end(html);
            });
        }
    });
}

getAllMovies();