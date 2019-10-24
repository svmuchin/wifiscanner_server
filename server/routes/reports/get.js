const { Report } = require('../../models')

module.exports = async (req, res) => {
    // http://localhost:3000/reports?_end=10&_order=DESC&_sort=id&_start=0
    // console.log(JSON.stringify(req.query))
    // console.log(JSON.stringify(req.params))
    const { id } = req.params
    if (id) {
        const report = await Report.findByPk(id)
        return res.send(report)
    }
    const reports = await Report.findAll({
        attributes: ['id', 'data', 'userId', 'createdAt'],
    })
    res.header('X-Total-Count', reports.length).send(reports)
}
