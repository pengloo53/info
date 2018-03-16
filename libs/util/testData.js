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