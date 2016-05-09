// set up dependencies
// -------------------
require('dotenv').config()
var express    = require('express'),
    bodyParser = require('body-parser'),
    app        = express();

require('./db/database.js');

// configure our public and views folders
// ---------------------------
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');

// configure our body parser
// -------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set up our controllers
// ----------------------
app.use('/attendance', require('./controllers/attendance.js'));

// set our route to our homepage
// -----------------------------
app.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/views/index.html');
})

// start our server!
// -----------------
var server = app.listen(process.env.PORT || 3000, function(){
  console.log('The server is listening on port ' + server.address().port + '!');
})
