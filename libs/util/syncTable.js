// todo
var todolist = require('../../models/todo/todolist.js');
var state = require('../../models/todo/state.js');

// fom
var centre = require('../../models/fom/centre.js');
var dept = require('../../models/fom/dept.js');
var office = require('../../models/fom/office.js');
var grade = require('../../models/fom/grade.js');
var job = require('../../models/fom/job.js');
var post = require('../../models/fom/post.js');
var staff = require('../../models/fom/staff.js');

// 同步表结构
todolist.sync({force: true});
state.sync({
    force: true
}).then(
    function(){
        state.bulkCreate([{state: '任务备案'},{state: 'on going'},{state: 'closed'}]);
    }
);

// 组织结构
centre.sync({force: true}).then(function(){
    centre.bulkCreate([{
        centre: 'DBG 信管中心',
        owner: '韩小龙',
        preparation: 247,
        bz: 'xxx'
    }]);
});
dept.sync({force: true}).then(function(){
    dept.bulkCreate([{
        centreId: 1,
        plant: 'B1',
        place: '北京',
        department: 'B1 信管部',
        owner: '张美荣',
        preparation: 17,
        bz: 'xxxx'
    }]);
});
office.sync({force: true}).then(function(){
    office.bulkCreate([{
        deptId: 1,
        office: 'B1 应用系统科',
        owner: '张美荣',
        preparation: 5,
        bz: 'yyy'
    }]);
});

// 岗位相关
grade.sync({force: true});
job.sync({force: true});
post.sync({force: true});
staff.sync({force: true});



