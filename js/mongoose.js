var mongoose    = require('mongoose');

mongoose.connect('mongodb://localhost/express-app');

var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback () {
    console.log("Connected!")
});
