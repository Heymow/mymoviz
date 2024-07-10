var express = require('express');
var router = express.Router();



const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
const options = { method: 'GET', headers: { accept: 'application/json', Authorization: 'Bearer ' + process.env.API_TOKEN } };

router.get('/movies', (req, res) => {
    fetch(url, options)
        .then(fetched => fetched.json())
        .then(jsoned => res.json({ result: true, movies: jsoned.results }))
        .catch(err => console.error('error:' + err));
});


module.exports = router;
