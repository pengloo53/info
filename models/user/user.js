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
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
},{
    timestamps: false,
    tableName: 'user'
});

user.sync();

module.exports = user;
