var Sequelize = require('sequelize');
var sequelize = require('../util/dbConnect.js');

var grade = sequelize.define('grade',{
    id: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    grade: Sequelize.STRING,
},{
    tableName: 'fom_grade',
    timestamps: true,
    // underscored: true,  // 默认字段采用蛇形命名，如create_at
    paranoid: true,     // 虚拟删除。启用该配置后，数据不会真实删除，而是添加一个deletedAt属性
    freezeTableName: true,
    charset: 'utf8',
    collate: 'utf8_general_ci'
});
grade.sync({force: true}).then(function(){
  grade.bulkCreate([{grade: '专家'},{grade: '资深'},{grade:'高级'},{grade:'中级'},{grade: '初级'},{grade:'助理'}]);
});
module.exports = grade;