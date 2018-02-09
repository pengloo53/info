var Sequelize = require('sequelize');
var sequelize = require('../util/dbConnect.js');

// 定义user表结构
var user = sequelize.define('user', {
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    username: Sequelize.STRING(100),  // 用户名
    password: Sequelize.STRING(500),  // 密码
    userid: Sequelize.STRING, // 员工号
    email: Sequelize.STRING, // 邮箱
    phone: Sequelize.INTEGER, // 密码
    deptId: Sequelize.BIGINT, // 部门id
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
},{
    timestamps: true,
    // underscored: true,  // 默认字段采用蛇形命名，如create_at
    paranoid: true,     // 虚拟删除。启用该配置后，数据不会真实删除，而是添加一个deletedAt属性
    freezeTableName: true,
    tableName: 'user',
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

user.sync();

module.exports = user;
