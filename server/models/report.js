const Sequelize = require('sequelize')

const db = require('../db')

const { reportValidator } = require('./validators')

class Report extends Sequelize.Model {}

Report.init({
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    data: {
        type: Sequelize.JSON,
        allowNull: false,
        validate: {
            reportValidator
        }
    },
}, {
    sequelize: db,
    modelName: 'report'
});

module.exports = Report
