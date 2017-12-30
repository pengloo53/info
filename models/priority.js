var Sequelize = require('sequelize');
var sequelize = require('./dbConnect.js');

var priority = sequelize.define('priority',{
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    title: Sequelize.STRING,
},{
    timestamps: false,
    tableName: 'u_priority'
});

module.exports = priority;