const https = require('./https')
const auth = require('./auth')
const isAnonymous = require('./is-anonymous')
const { isAdmin, isEngineer, isUser } = require('./roles')

module.exports = {
    https,
    auth,
    isAdmin,
    isEngineer,
    isUser,
    isAnonymous
}
