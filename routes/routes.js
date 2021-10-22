
'use strict';

const fs = require('fs');
let movies;
const fileName = 'movies.json';

fs.readFile(fileName, 'utf8', function (err, data) {
    if (err) throw err;
    movies = JSON.parse(data);
});

//
// ** "Controllers" i samma fil, i vanliga fall skulle detta delas upp i en separat fil tillägnad det problem som kontrollern ska lösa
//

const searchMovies = (title) => {

    let results = [];
    const searchField = 'title';

    for (let i=0 ; i < movies.videos.length ; i++)
    {
        if (movies.videos[i][searchField].includes(title)) {
            results.push(movies.videos[i]);
        }
    }

    return results;
}

const updateMovieGrade = (id, movieGrade) => {
    const searchField = "id";

    if (movieGrade > 5 || movieGrade < 0 ) {
        throw 'Grade not valid';
    } else {
        for (let i=0 ; i < movies.videos.length ; i++)
        {
            if (JSON.stringify(movies.videos[i][searchField]) === id) {
                movies.videos[i]['grade'] = movieGrade;

                fs.writeFile(fileName, JSON.stringify(movies, null, 4),
                    function writeJSON(err) {
                    if (err) return err;
                })
            }
        }
    }



    return movies;
}



//
// ** Routes
//

const router = app => {
    app.get('/', (request, response) => {
        response.send({
            message: 'Hello StoryKit!'
        });
    });

    app.get('/movies', (request, response) => {
        response.send(movies.videos);
    });

    app.get('/movies/:title', (request, response) => {
        let title = request.params.title;

        response.send(searchMovies(title));
    });

    app.put('/movies/:id', function (request, response) {
        let id = request.params.id;
        let movieGrade = request.body.grade;

        response.send(updateMovieGrade(id, movieGrade));
    })
}



module.exports = router;



