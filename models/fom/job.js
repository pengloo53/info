var Sequelize = require('sequelize');
var sequelize = require('../util/dbConnect.js');

var job = sequelize.define('job',{
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    job: Sequelize.STRING,
},{
    // timestamps: false,
    tableName: 'fom_job'
});

module.exports = job;