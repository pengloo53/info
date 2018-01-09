var todolist = require('../../models/todolist.js');
var state = require('../../models/state.js');

// todolist.findAll().then(function(todolists){
//     console.log(todolists);
// });

// 创建u_state表的基础数据
state.create({
    title: '任务备案',
}).then(function (p) {
    console.log('created.' + JSON.stringify(p));
}).catch(function (err) {
    console.log('failed: ' + err);
});

state.create({
    title: 'on going',
}).then(function (p) {
    console.log('created.' + JSON.stringify(p));
}).catch(function (err) {
    console.log('failed: ' + err);
});

state.create({
    title: 'closed',
}).then(function (p) {
    console.log('created.' + JSON.stringify(p));
}).catch(function (err) {
    console.log('failed: ' + err);
});