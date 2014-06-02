var async = require('async')

/**
 * Controllers
 */

var users = require('../app/controllers/users')
//    , articles = require('../app/controllers/articles')
    , auth = require('./middlewares/authorization')

/**
 * Route middlewares
 */

var articleAuth = [auth.requiresLogin, auth.article.hasAuthorization]
var commentAuth = [auth.requiresLogin, auth.comment.hasAuthorization]

/**
 * Expose routes
 */

module.exports = function (app, passport) {
    app.get('/', users.show)
    // user routes
    app.get('/login', users.login)
    app.get('/signup', users.signup)
    app.get('/logout', users.logout)
    app.post('/users', users.create)
    app.post('/users/session',
        passport.authenticate('local', {
            failureRedirect: '/login',
            failureFlash: 'Invalid email or password.'
        }), users.session)
    app.get('/users/:userId', users.show)
    app.param('userId', users.user)
}