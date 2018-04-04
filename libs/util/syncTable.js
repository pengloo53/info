// 通用
var state = require('../../models/state.js');
var user = require('../../models/user/user.js');
var log = require('../../models/log.js');

// todo
var todolist = require('../../models/todo/todolist.js');

// fom
var centre = require('../../models/fom/centre.js');
var dept = require('../../models/fom/dept.js');
var office = require('../../models/fom/office.js');
var duty = require('../../models/fom/duty.js');
var grade = require('../../models/fom/grade.js');
var post = require('../../models/fom/post.js');
var staff = require('../../models/fom/staff.js');

// 同步表结构
state.sync();
user.sync();
log.sync();

// todo 相关
todolist.sync();

// 组织结构
centre.sync();
dept.sync();
office.sync();

// 岗位相关
duty.sync();
grade.sync();
post.sync();
staff.sync();