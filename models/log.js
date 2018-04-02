var Sequelize = require('sequelize');
var sequelize = require('./util/dbConnect.js');
var moment = require('moment'); 

var log = sequelize.define('log',{
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    page: Sequelize.STRING,     // fom,project
    username: Sequelize.STRING,   // 用户
    action: Sequelize.STRING,   // 操作动作：add,update,delete
    name: Sequelize.STRING,     // 操作对象
    oldData: Sequelize.STRING,  // 旧数据
    newData: Sequelize.STRING,  // 更新数据
    ip: Sequelize.STRING,        // IP地址
    createdAt: {  
        type: Sequelize.DATE,  
        get() {  
            return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');  
        }  
    },  
    updatedAt: {  
        type: Sequelize.DATE,  
        get() {  
            return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');  
        }  
    }
},{
    // timestamps: true,
    timezone: '+08:00', // 东八时区
    tableName: 'log',
    // underscored: true,  // 默认字段采用蛇形命名，如create_at
    paranoid: true,     // 虚拟删除。启用该配置后，数据不会真实删除，而是添加一个deletedAt属性
    freezeTableName: true,
    charset: 'utf8',
    collate: 'utf8_general_ci'
});
// log.sync({force: true});
module.exports = log;