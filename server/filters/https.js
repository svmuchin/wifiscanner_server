module.exports = async (req, res, next) => {
    if (process.env.NODE_ENV === 'production' && req.headers['x-forwarded-proto'] != 'https') {
        res.redirect(302, 'https://' + req.hostname + req.originalUrl)
    }
    next()
}
