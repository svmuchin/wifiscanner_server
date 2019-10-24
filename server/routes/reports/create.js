const createError = require('http-errors')

const { Report } = require('../../models')

module.exports = async (req, res, next) => {
    try {
        const json = req.body
        const report = await Report.create({userId: req.user.id, data: json})
        res.send({ reportId: report.id })
    } catch (e) {
        console.log(e)
        next(createError(400))
    }
}
