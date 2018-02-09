var Staff = require('../../models/fom/staff.js');
var Dept = require('../../models/fom/dept.js');
var deptData = [{
  department: 'B1信管部',
  office: 'B1应用系统科',
  place: 'B1'
}, {
  department: 'B1信管部',
  office: 'B1 IT科',
  place: 'B1'
}, {
  department: 'B2信管部',
  office: 'B2应用系统科',
  place: 'B2'
}, {
  department: 'B2信管部',
  office: 'B2 IT科',
  place: 'B2'
}, {
  department: 'B3信管部',
  office: 'B3应用系统科',
  place: 'B3'
}, {
  department: 'B3信管部',
  office: 'B3 IT科',
  place: 'B3'
}];

var staffData = {
  deptId: 1,
  name: '鲁鹏',
  gender: '男',
  birthday: '1989-05-03',
  birth_place: '湖北武汉',
  education: '硕士',
  school: '河北工业大学',
  major: '计算机应用技术',
  work_date: '2014-02-24',
  enter_date: '2014-02-24',
  grade: '高级',
  mainPost: '科长',
  subPost: '-',
  postType: '科长',
  postDescribe: '科长的干活',
  state: '在岗',
  bz: null
};

function addData() {
  Dept.bulkCreate(deptData);
  Staff.create(staffData);
}

function selectStaff() {
  Staff.findAll({
    include: [Dept]
  }).then(function (p) {
    console.log('>>>>>>>>>>>>>>>>' + JSON.stringify(p));
  });
}

// addData();
selectStaff();