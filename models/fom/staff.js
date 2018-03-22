var Sequelize = require('sequelize');
var sequelize = require('../util/dbConnect.js');

var staff = sequelize.define('staff',{
    sid: {
        type: Sequelize.BIGINT(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    centreId: Sequelize.BIGINT,     // 中心id
    deptId: Sequelize.BIGINT,       // 部门id
    officeId: Sequelize.BIGINT,     // 科室id
    name: Sequelize.STRING,         // 姓名
    userid: Sequelize.STRING,       // 员工号
    gender: Sequelize.STRING,       // 性别
    birthday: Sequelize.STRING,     // 出生年月
    birth_place: Sequelize.STRING,  // 出生地
    domicile_place: Sequelize.STRING, // 户籍所在地
    education: Sequelize.STRING,    // 学历：本科，硕士，博士
    school: Sequelize.STRING,       // 毕业学校
    major: Sequelize.STRING,        // 专业
    graduation_date: Sequelize.STRING, // 毕业日期
    work_date: Sequelize.STRING,    // 工作时间
    enter_date: Sequelize.STRING,   // 入司时间
    grade: Sequelize.STRING,        // 职级
    mainPost: Sequelize.STRING,     // 主责岗位
    subPost: Sequelize.STRING,      // 次责岗位
    postType: Sequelize.STRING,         // 岗位类型
    postDescribe: Sequelize.STRING(500),
    state: Sequelize.STRING,        // 状态：1实习，2试用，3在岗，4离职
    sbz: Sequelize.STRING(500),      // 备注：离职原因
},{
    timestamps: true,
    // underscored: true,  // 默认字段采用蛇形命名，如create_at
    paranoid: true,     // 虚拟删除。启用该配置后，数据不会真实删除，而是添加一个deletedAt属性
    freezeTableName: true,
    tableName: 'fom_staff',
    charset: 'utf8',
    collate: 'utf8_general_ci'
});
// staff.sync({force: true});
module.exports = staff;