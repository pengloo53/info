var todolist = require('../../models/todo/todolist.js');
var state = require('../../models/todo/state.js');
var dept = require('../../models/fom/dept.js');
var grade = require('../../models/fom/grade.js');
var job = require('../../models/fom/job.js');
var post = require('../../models/fom/post.js');
var staff = require('../../models/fom/staff.js');

// 同步表结构
todolist.sync({
    force: true
});
state.sync({
    force: true
});
dept.sync({
    force: true
});
grade.sync({
    force: true
});
job.sync({
    force: true
});
post.sync({
    force: true
});
staff.sync({
    force: true
});

state.sync({
    force: true
}).then(
    function(){
        // 创建基础数据
        state.bulkCreate(
            [{
                state: '任务备案'
            },{
                state: 'on going'
            },{
                state: 'closed'
            }]
        );
    }
);

