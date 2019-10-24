const createError = require('http-errors')

const { User } = require('../models')

const ROLES = Object.values(User.ROLES)
const hasRole = (user, role) => ROLES.indexOf(user.role) <= ROLES.indexOf(role)

const isAdmin = async (req, res, next) => {
    if (req.user && hasRole(req.user, User.ROLES.ADMIN)) {
        return next()
    }
    next(createError(401))
}

const isEngineer = async (req, res, next) => {
    if (req.user && hasRole(req.user, User.ROLES.ENGINEER)) {
        return next()
    }
    next(createError(401))
}


const isUser = async (req, res, next) => {
    if (req.user && hasRole(req.user, User.ROLES.USER)) {
        return next()
    }
    next(createError(401))
}

module.exports = {
    isAdmin,
    isEngineer,
    isUser
}
