var Sequelize = require('sequelize');
var sequelize = require('../util/dbConnect.js');

var centre = sequelize.define('centre',{
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    centre: Sequelize.STRING,  // 中心
    owner: Sequelize.STRING,   // 中心长
    preparation: Sequelize.BIGINT,  // 总编制
    bz: Sequelize.STRING   // 备注
},{
    timestamps: true,
    // underscored: true,  // 默认字段采用蛇形命名，如create_at
    paranoid: true,     // 虚拟删除。启用该配置后，数据不会真实删除，而是添加一个deletedAt属性
    freezeTableName: true,
    tableName: 'fom_centre',
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

// 新建初始数据
centre.sync({force: true}).then(function(){
    centre.bulkCreate([{
        centre: 'DBG 信管中心',
        owner: '韩小龙',
        preparation: 247,
        bz: 'xxx'
    }]);
});

module.exports = centre;