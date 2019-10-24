const { Report } = require('../../models')

module.exports = async (req, res) => {
    const { _start, _end, _sort, _order } = req.query
    const { id : pk } = req.params

    if (pk) {
        const report = await Report.findByPk(pk)
        return res.send(report)
    }

    const count = await Report.count()
    const reports = await Report.findAll({
        attributes: ['id', 'data', 'userId', 'createdAt'],
        order: [
            [_sort, _order],
        ],
        offset: _start,
        limit: _end - _start
    })
    res.header('X-Total-Count', count).send(reports)
}
