var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var Movie = require('./models/Movie');

// Load envirorment variables
dotenv.load();

console.log(process.env.MONGODB);

// Connect to Sandbox MongoDB
mongoose.connect(process.env.MONGODB);
mongoose.connection.on('error',function(err){
    console.log("Connection was unable to take place");
    process.exit(1);
});

// Setup Express App
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/movie', function(req, res) {
    // Create new movie
    var movie = new Movie({
        title: req.body.title,
        genre: req.body.genre,
        year: parseInt(req.body.year),
        reviews: []
    });

    // Save movie to database
    movie.save(function(err){
        if (err) throw err;
        return res.send("Successfully inserted movie :)");
    });
});

app.delete('/movie/:id', function(req, res) {
    // Find movie by id
    Movie.findByIdAndRemove(req.body.id, function(err, movie){
        if (err) throw err;
        if (!movie) return res.send("No movie by that ID found");

        return res.send("Movie "+req.body.id+" was deleted!");
    });

});

app.get('/movie', function(req, res) {
    // Get all movies
    Movie.find({}, function(err, movies){
        if (err) throw err;
        res.send(movies);
    });
});

app.post('/movie/:id/review', function(req, res) {
    // Add a review
    Movie.findOne({_id: req.body.id},function(err, movie){
        if (err) throw err;
        if (!movie) return res.send("No movie by that ID found");

        movie.reviews.push({
            rating: parseFloat(req.body.rating),
            comment: req.body.comment,
            author: req.body.author
        });

        movie.save(function(err){
            if (err) throw err;
            return res.send("Successfully added review!");
        });
    });

});

app.delete('/movie/:id/review/last', function(req, res) {
    // Delete last review

});


app.listen(3000, function() {
    console.log('App listening on port 3000!');
})
