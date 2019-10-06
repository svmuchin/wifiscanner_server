const https = require('./https')
const auth = require('./auth')
const isAdmin = require('./is-admin')
const isUser = require('./is-user')
const isAnonymous = require('./is-anonymous')

module.exports = {
    https,
    auth,
    isAdmin,
    isUser,
    isAnonymous
}
