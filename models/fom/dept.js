var Sequelize = require('sequelize');
var sequelize = require('../util/dbConnect.js');

var dept = sequelize.define('dept',{
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    centreId: Sequelize.BIGINT,       // 中心
    plant: Sequelize.STRING,  // 工厂
    place: Sequelize.STRING, // 地点
    dept: Sequelize.STRING,   // 部门
    owner: Sequelize.STRING,   // 部长
    preparation: Sequelize.BIGINT,  // 总编制
    bz: Sequelize.STRING   // 备注
},{
    timestamps: true,
    // underscored: true,  // 默认字段采用蛇形命名，如create_at
    paranoid: true,     // 虚拟删除。启用该配置后，数据不会真实删除，而是添加一个deletedAt属性
    freezeTableName: true,
    tableName: 'fom_dept',
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

module.exports = dept;