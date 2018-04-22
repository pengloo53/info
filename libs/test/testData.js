// 通用
var state = require('../../models/state.js');

// todo
var todolist = require('../../models/todo/todolist.js');

// fom
var centre = require('../../models/fom/centre.js');
var dept = require('../../models/fom/dept.js');
var office = require('../../models/fom/office.js');
var grade = require('../../models/fom/grade.js');
var post = require('../../models/fom/post.js');
var staff = require('../../models/fom/staff.js');


// 新建初始数据
centre.sync({force: true}).then(function(){
    centre.bulkCreate([{
        centre: 'DBG 信管中心',
        owner: '韩小龙',
        preparation: 247,
        bz: 'xxx'
    }]);
});

grade.sync({force: true}).then(function(){
  grade.bulkCreate([{grade: '专家'},{grade: '资深'},{grade:'高级'},{grade:'中级'},{grade: '初级'},{grade:'助理'}]);
});

user.sync({force: true}).then(function(p){
    var createTime = new Date().getTime();
    user.create({
        username: 'admin',
        password: 'admin',
        userid: '118663',
        email: 'lupeng_ot@boe.com.cn',
        deptId: 1,
        role: 'A'
    });
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