var todolist = require('../../models/todolist.js');
var state = require('../../models/state.js');

// 同步表结构
todolist.sync({
    force: true
});

state.sync({
    force: true
}).then(
    function(){
        // 创建基础数据
        state.bulkCreate(
            [{
                title: '任务备案'
            },{
                title: 'on going'
            },{
                title: 'closed'
            }]
        );
    }
);

