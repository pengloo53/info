var Sequelize = require('sequelize');
var sequelize = require('../util/dbConnect.js');

var grade = sequelize.define('grade',{
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    grade: Sequelize.STRING,
},{
    // timestamps: false,
    tableName: 'u_grade'
});

module.exports = grade;