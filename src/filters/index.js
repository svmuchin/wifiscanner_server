const auth = require('./auth')
const isAdmin = require('./is-admin')
const isUser = require('./is-user')
const isAnonymous = require('./is-anonymous')

module.exports = {
    auth,
    isAdmin,
    isUser,
    isAnonymous
}
