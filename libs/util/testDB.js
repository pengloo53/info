// var Staff = require('../../models/fom/staff.js');
// var Dept = require('../../models/fom/dept.js');
var Sequelize = require('sequelize');
// var sequelize = require('../util/dbConnect.js');
var sequelize = require('../../models/util/dbConnect.js');

function resetDB() {
  var Staff = sequelize.define('staff', {
    id: {
      type: Sequelize.BIGINT(11),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    // deptId: Sequelize.BIGINT(11),   // 部门id
    name: Sequelize.STRING, // 姓名
    userid: Sequelize.STRING, // 员工号
    gender: Sequelize.STRING, // 性别
    birthday: Sequelize.STRING, // 出生年月
    birth_place: Sequelize.STRING, // 籍贯
    education: Sequelize.STRING, // 学历：本科，硕士，博士
    school: Sequelize.STRING, // 毕业学校
    major: Sequelize.STRING, // 专业
    work_date: Sequelize.STRING, // 工作时间
    enter_date: Sequelize.STRING, // 入司时间
    grade: Sequelize.STRING, // 职级
    mainPost: Sequelize.STRING, // 主责岗位
    subPost: Sequelize.STRING, // 次责岗位
    postType: Sequelize.STRING, // 岗位类型
    postDescribe: Sequelize.STRING(500),
    state: Sequelize.STRING, // 状态：1实习，2试用，3在岗，4离职
    bz: Sequelize.STRING(500), // 备注：离职原因
  });
  var Dept = sequelize.define('dept', {
    id: {
      type: Sequelize.BIGINT(11),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    centre: Sequelize.STRING, // 中心
    department: Sequelize.STRING, // 部门
    office: Sequelize.STRING, // 科室
    place: Sequelize.STRING, // 工作地点
    bz: Sequelize.STRING
  });
  Dept.hasMany(Staff);
  Staff.belongsTo(Dept);
  Dept.sync();
  Staff.sync();
  Staff.findAll({
    'include': [Dept]
  }).then(function (p) {
    console.log('>>>>>>>>>>>' + JSON.stringify(p));
  });
}

resetDB();

function test02() {
  var User_test = sequelize.define('user_test', {
    'emp_id': {
      'type': Sequelize.CHAR(10),
      'allowNull': false,
      'unique': true
    }
  });
  var Note_test = sequelize.define('note_test', {
    'title': {
      'type': Sequelize.CHAR(64),
      'allowNull': false
    }
  });

  /*
   * User的实例对象将拥有getNotes、setNotes、addNote、createNote、removeNote、hasNote方法
   */
  User_test.hasMany(Note_test);
  /*
   * Note的实例对象将拥有getUser、setUser、createUser方法
   */
  Note_test.belongsTo(User_test);

  User_test.sync();
  Note_test.sync();
  User_test.findAll({
    'include': [Note_test]
  }).then(function (p) {
    console.log('??????');
  });
}

// test02();