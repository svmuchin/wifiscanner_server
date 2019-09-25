const { User } = require('../models')
const createError = require('http-errors')

module.exports = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ where: {email} })
        if (user && await user.validatePassword(password)) {
            return res.send({ token: user.token })
        }
    } catch (e) {
        console.log(e)
    }
    next(createError(400, 'Wrong email or password'))
}
