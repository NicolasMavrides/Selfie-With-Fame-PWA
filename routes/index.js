var express = require('express');
var router = express.Router();
var db = require('../controllers/db_init');

db.init_sample();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about');
});

//////////////////// Events //////////////////

var events = require('../controllers/events');

/* GET events form */
router.get('/create_event', function(req, res, next) {
  res.render('event_form');
});

/* GET an event */
router.get('/events/:event_id', events.open);

/* POST the Event form */
router.post('/post_event', events.create);


/////////////////// Stories //////////////////////

var stories = require('../controllers/stories');

/* GET stories form */
router.get('/create_story', function(req, res, next) {
  res.render('story_form');
});

/* GET a story */
router.get('/stories/:story_id', stories.open);


/* POST the Story form */
router.post('/post_story', stories.create);


module.exports = router;
