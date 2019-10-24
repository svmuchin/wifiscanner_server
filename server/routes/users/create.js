const { ValidationError } = require('sequelize')
const createError = require('http-errors')

const { User } = require('../../models')

module.exports = async (req, res, next) => {
    try {
        const json = req.body
        const user = await User.create(json)
        res.send({userId: user.id})
    } catch (e) {
        if (e instanceof ValidationError) {
            const errors = e.errors.reduce((result, error) => result[error.path] = error.message, {})
            res.status(400).send(errors)
        }
        next(createError(400))
    }
}
