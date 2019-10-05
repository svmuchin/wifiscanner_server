const createError = require('http-errors')

module.exports = async (req, res, next) => {
    if (req.user) {
        return next()
    }
    next(createError(401))
}
