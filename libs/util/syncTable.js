var todolist = require('../../models/todolist.js');
var state = require('../../models/state.js');

// 同步表结构
todolist.sync({
    force: true
});

state.sync({
    force: true
});