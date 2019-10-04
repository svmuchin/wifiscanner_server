module.exports = async (req, res) => {
    const { user } = req
    const reports = await user.getReports()
    const env = process.env.DEVELOPMENT
    res.render('index', {title: 'Сберлокатор', user, reports, env})
}
