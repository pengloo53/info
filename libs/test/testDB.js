var Sequelize = require('sequelize');
var sequelize = require('../../models/util/dbConnect.js');
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
});

function resetDB() {
  Dept.hasMany(Staff);
  Staff.belongsTo(Dept);
  // del table
  Staff.drop().then(function(){
    Dept.drop();
  }); 
  Dept.sync().then(function(){
    Staff.sync();
  });
  
}

// resetDB();
Staff.findAll({
  'include': [{
    model: Dept,
    where:{id: Sequelize.col('Staff.deptId')}
  }]
}).then(function (p) {
  console.log('>>>>>>>>>>>' + JSON.stringify(p));
});

function test02() {
  var User_test = sequelize.define('user_test', {
    'emp_id': {
      'type': Sequelize.CHAR(10),
      'allowNull': false,
      'unique': true
    }
  },{
    // tableName: 'users'
  });
  var Note_test = sequelize.define('note_test', {
    'title': {
      'type': Sequelize.CHAR(64),
      'allowNull': false
    }
  },{
    // tableName: 'notes'
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