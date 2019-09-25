const Sequelize = require('sequelize')
const db = require('../db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const generateHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync())
const getToken = (email) => jwt.sign({email}, process.env.JWT_SECRET)

class User extends Sequelize.Model {

    async validatePassword(password) {
        return await bcrypt.compare(password, this.password)
    }
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
        isIn: [['admin', 'user']]
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
                user.setDataValue('token', getToken(user.email))
            }
        },
    },
    sequelize: db,
    modelName: 'user'
});

module.exports = User
