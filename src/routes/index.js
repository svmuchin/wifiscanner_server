const db = require('../db/connection')

module.exports = (req, res, next) => {
    db
        .authenticate()
        .then(() => {
            res.render('index', {title: 'Сберлокатор', message: 'Подключение к базе успешно'})
        })
        .catch(next)
}
