module.exports = async (req, res) => {
    res.render('index', {title: 'Сберлокатор', userName: req.user.name})
}
