const Sequelize = require('sequelize')
const db = require('../db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Report = require('./report')

const generateHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync())
const getToken = ({ email, role }) => jwt.sign({email, role}, process.env.JWT_SECRET)

class User extends Sequelize.Model {

    async validatePassword(password) {
        return await bcrypt.compare(password, this.password)
    }
}

User.ROLES = {
    ADMIN: 'admin',
    ENGINEER: 'engineer',
    USER: 'user'
}

User.init({
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        isEmail: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        set(value) {
            this.setDataValue('password', generateHash(value));
        }
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false,
        isIn: [Object.values(User.ROLES)]
    },
    token: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        len: 64,
    }
}, {
    hooks: {
        beforeValidate: (user) => {
            if (user._changed.password) {
                user.setDataValue('token', getToken(user))
            }
        },
    },
    sequelize: db,
    modelName: 'user'
});

User.hasMany(Report, { as: 'reports', foreignKey: 'userId' })
Report.belongsTo(User, { as: 'user', foreignKey: 'userId' })

module.exports = User
