var Sequelize = require('sequelize');
var sequelize = require('./util/dbConnect.js');

var state = sequelize.define('state',{
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    page: Sequelize.STRING,
    state: Sequelize.STRING,
},{
    timestamps: true,
    tableName: 'state',
    // underscored: true,  // 默认字段采用蛇形命名，如create_at
    paranoid: true,     // 虚拟删除。启用该配置后，数据不会真实删除，而是添加一个deletedAt属性
    freezeTableName: true,
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

state.sync({force: true}).then(function(){
  state.bulkCreate([
  	{page: 'todo', state: '任务备案'},
  	{page: 'todo', state: 'on going'},
  	{page: 'todo', state: 'closed'},
  	{page: 'fom', state: '在岗'},
  	{page: 'fom', state: '试用'},
  	{page: 'fom', state: '实习'},
  	{page: 'fom', state: '离职'}
  ]);
});

module.exports = state;