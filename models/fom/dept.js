var Sequelize = require('sequelize');
var sequelize = require('../util/dbConnect.js');

var dept = sequelize.define('dept',{
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    centre: Sequelize.STRING,       // 中心
    department: Sequelize.STRING,  // 部门
    office: Sequelize.STRING,   // 科室
    place: Sequelize.STRING,   // 工作地点
    bz: Sequelize.STRING
},{
    // timestamps: false,
    // tableName: 'u_dept'
});

module.exports = dept;