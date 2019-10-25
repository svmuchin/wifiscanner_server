const { Report } = require('../../models')

module.exports = async (req, res) => {
    const { _start, _end, _sort, _order, userId } = req.query
    const { id : pk } = req.params

    if (pk) {
        const report = await Report.findByPk(pk)
        return res.send(report)
    }

    const request = { attributes: ['id', 'data', 'userId', 'createdAt'] }
    if (userId) {
        request.where = { userId }
    }
    if (_start && _end) {
        request.offset =_start
        request.limit = _end - _start
    }
    if (_sort && _order) {
        request.order = [[_sort, _order]]
    }

    const count = await Report.count()
    const reports = await Report.findAll(request)
    res.header('X-Total-Count', count).send(reports)
}
