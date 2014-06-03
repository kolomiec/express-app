var async = require('async')

/**
 * Controllers
 */

var users = require('../app/controllers/users')
    , articles = require('../app/controllers/articles')
    , auth = require('./middlewares/authorization')
    , comments = require('../app/controllers/comments')
    , tags = require('../app/controllers/tags')
/**
 * Route middlewares
 */

var articleAuth = [auth.requiresLogin, auth.article.hasAuthorization]
var commentAuth = [auth.requiresLogin, auth.comment.hasAuthorization]

/**
 * Expose routes
 */

module.exports = function (app, passport) {
    app.get('/', articles.index)
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

    app.get('/articles', articles.index)
    app.get('/articles/new', auth.requiresLogin, articles.new)
    app.post('/articles', auth.requiresLogin, articles.create)
    app.get('/articles/:id', articles.show)
    app.get('/articles/:id/edit', articleAuth, articles.edit)
    app.put('/articles/:id', articleAuth, articles.update)
    app.del('/articles/:id', articleAuth, articles.destroy)
    app.post('/articles/:id/comments', auth.requiresLogin, comments.create)
    app.get('/articles/:id/comments', auth.requiresLogin, comments.create)
    app.del('/articles/:id/comments/:commentId', commentAuth, comments.destroy)


    app.param('userId', users.user)
    app.param('id', articles.load)
    app.param('commentId', comments.load)


    // tag routes
    app.get('/tags/:tag', tags.index)

}