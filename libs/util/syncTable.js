var todolist = require('../../models/todolist.js');
var priority = require('../../models/priority.js');
var state = require('../../models/state.js');

// 同步表结构
todolist.sync({
    force: true
});

state.sync({
    force: true
});

priority.sync({
    force: true
});