var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var dataUtil = require("./data-util");
var _ = require("underscore");
var logger = require('morgan');
var exphbs = require('express-handlebars');
var handlebars = exphbs.handlebars;
var moment = require('moment');
var marked = require('marked');
var app = express();
var PORT = 3000;

var _DATA = dataUtil.loadData().blog_posts;

/// MIDDLEWARE 
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main', partialsDir: "views/partials/" }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

app.get("/", function(req, res) {
    var tags = dataUtil.getAllTags(_DATA);
    res.render('home',{
        data: _DATA,
        tags:tags
    });

});

app.get("/create", function(req, res) {
    res.render('create');
});

app.post("/create",function(req,res){
    var body = req.body;

    body.tags = body.tags.split(" ");
    body.content = marked(body.content);

    body.preview = body.content.substring(0,300);
    body.time = moment().format("MMMM DD YYYY, h:mm a");

    console.log(body);

    _DATA.push(req.body);
    dataUtil.saveData(_DATA);
    res.redirect('/');
});

app.get('/post/:slug', function(req, res) {
    var _slug = req.params.slug;
    var blog_post = _.findWhere(_DATA, {slug: _slug});
    if (!blog_post) return res.render('404');
    res.render("post",blog_post);   
});

app.get('/tag/:tag', function(req, res) {
    var _tag = req.params.tag;
    var tags = dataUtil.getAllTags(_DATA);
    var posts = [];
    _DATA.forEach(function(post){
        if (post.tags.includes(_tag)){
            posts.push(post);
        }
    });
    res.render('home',{
        tag: _tag,
        data: posts,
        tags: tags
    });    

});

// Start listening on port PORT
app.listen(PORT, function() {
    console.log('Server listening on port:', PORT);
});
