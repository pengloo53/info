var Sequelize = require('sequelize');
var sequelize = require('../util/dbConnect.js');

var state = sequelize.define('state',{
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    state: Sequelize.STRING,
},{
    // timestamps: false,
    tableName: 'u_state'
});

module.exports = state;