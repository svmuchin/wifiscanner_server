module.exports = async (req, res) => {
    const { user } = req
    const reports = await user.getReports()
    res.send({ reports })
}
