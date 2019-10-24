const { User } = require('../../models')

module.exports = async (req, res) => {
    const users = await User.findAll({
        attributes: ['id', 'email', 'name', 'role']
    })
    res.header('X-Total-Count', users.length).send(users)
}
