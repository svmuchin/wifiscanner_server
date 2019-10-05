const createError = require('http-errors')

module.exports = async (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        return next()
    }
    next(createError(401))
}
