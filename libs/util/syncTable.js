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

// 同步表结构
state.sync({force: true});

// todo 相关
todolist.sync({force: true});

// 组织结构
centre.sync({force: true});
dept.sync({force: true});
office.sync({force: true});

// 岗位相关
grade.sync({force: true});
post.sync({force: true});
staff.sync({force: true});