var Sequelize = require('sequelize');
var sequelize = require('../util/dbConnect.js');

var department = sequelize.define('department',{
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
    timestamps: true,
    // underscored: true,  // 默认字段采用蛇形命名，如create_at
    paranoid: true,     // 虚拟删除。启用该配置后，数据不会真实删除，而是添加一个deletedAt属性
    freezeTableName: true,
    tableName: 'u_dept',
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

module.exports = dept;