var express = require('express')
    , fs = require('fs')
    , passport = require('passport')

var env = process.env.NODE_ENV || 'development'
    , config = require('./config/config')[env]
    , mongoose = require('mongoose')


var connect = function () {
//    var options = { server: { socketOptions: { keepAlive: 1 } } }
    mongoose.connect('mongodb://localhost/express-app');
    console.log('Iha DB is connected');
}
connect()

// Error handler
mongoose.connection.on('error', function (err) {
    console.log('DB connect error - ',err)
})

// Reconnect when closed
mongoose.connection.on('disconnected', function () {
    console.log('DB was disconnected')
    connect()
})

var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function (file) {
    if (~file.indexOf('.js')) require(models_path + '/' + file)
})


// bootstrap passport config
require('./config/passport')(passport, config)

var app = express()
// express settings
require('./config/express')(app, config, passport)

// Bootstrap routes
require('./config/routes')(app, passport)

// Start the app by listening on <port>
app.listen(8080, function(){
    console.log('Express server listening on port 8080');
});


module.exports = app;





