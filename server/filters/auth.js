const jwt = require('jsonwebtoken')

const { User } = require('../models')

module.exports = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ where: {
            email: data.email,
            token
        }})
        if (user) {
            req.user = user
            req.token = token
        }
    } catch (e) {
        console.log(e)
    } finally {
        next()
    }
}
