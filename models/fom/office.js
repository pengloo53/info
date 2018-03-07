var Sequelize = require('sequelize');
var sequelize = require('../util/dbConnect.js');

var office = sequelize.define('office',{
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    deptId: Sequelize.BIGINT,  // 部门id
    office: Sequelize.STRING,   // 科室
    owner: Sequelize.STRING,   // 科长
    preparation: Sequelize.BIGINT,  // 总编制
    bz: Sequelize.STRING   // 备注
},{
    timestamps: true,
    // underscored: true,  // 默认字段采用蛇形命名，如create_at
    paranoid: true,     // 虚拟删除。启用该配置后，数据不会真实删除，而是添加一个deletedAt属性
    freezeTableName: true,
    tableName: 'fom_office',
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

module.exports = office;