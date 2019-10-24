const { Op } = require('sequelize')
const { User } = require('../../models')

module.exports = async (req, res) => {
    const { _start, _end, _sort, _order, id } = req.query
    const { id : pk } = req.params

    if (pk) {
        const report = await User.findByPk(pk)
        return res.send(report)
    }

    const request = { attributes: ['id', 'email', 'name', 'role'] }
    if (id) {
        if (Array.isArray(id)) {
            const numericIds = id.map((id) => parseInt(id, 10))
            request.where = { id: { [Op.in]: numericIds}}
        } else {
            request.where = { id }
        }
    }
    if (_start && _end) {
        request.offset =_start
        request.limit = _end - _start
    }
    if (_sort && _order) {
        request.order = [[_sort, _order]]
    }

    const count = await User.count()
    const users = await User.findAll(request)
    res.header('X-Total-Count', count).send(users)
}
