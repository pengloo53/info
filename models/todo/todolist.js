var Sequelize = require('sequelize');
var sequelize = require('../util/dbConnect.js');

var todolist = sequelize.define('todolist',{
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    title: Sequelize.STRING(100),       // 标题&任务
    content: Sequelize.STRING(500),     // 详细内容&方向
    result: Sequelize.STRING,           // 产出
    priority: Sequelize.STRING,         // 级别
    officer: Sequelize.STRING,          // 负责人
    owner: Sequelize.STRING,            // 承接人
    startDate: Sequelize.STRING,        // 开始时间
    planFinishDate: Sequelize.STRING,   // 计划完成时间
    realFinishDate: Sequelize.STRING,   // 实际完成时间
    bz: Sequelize.STRING(500),          // 备注
    state: Sequelize.INTEGER,           // 状态
    // createdAt: Sequelize.BIGINT,
    // updatedAt: Sequelize.BIGINT,
    // version: Sequelize.BIGINT
},{
    // timestamps: false,
    tableName: 'todolist'
});

module.exports = todolist;