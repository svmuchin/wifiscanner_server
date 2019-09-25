const db = require('../db')
const { User } = require('../models')

module.exports = async () => {
    await db.sync()
    const usersCount = await User.count()
    if (usersCount === 0) {
        User.create({
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_DEFAULT_PASSWORD,
            role: 'admin',
            name: 'Administrator'
        })
    }
}
