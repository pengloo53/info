var todolist = require('../../models/todo/todolist.js');
var state = require('../../models/todo/state.js');
var dept = require('../../models/fom/dept.js');
var grade = require('../../models/fom/grade.js');
var job = require('../../models/fom/job.js');
var post = require('../../models/fom/post.js');
var staff = require('../../models/fom/staff.js');
var deptData = [];
deptData.push({
    centre: 'DBG信管中心',
    department: '企划部',
    office: '重点项目企划科',
    place: 'B4',
    bz: '北京'
});
for(var i = 1 ; i <= 17 ; i++){
    if(i == 13 || i == 14 || i==15 || i==16){continue;}
    var data1 = {
        centre: 'DBG 信管中心',
        department: 'B'+i+' 信管部',
        office: 'B'+i+' 应用系统科',
        place: 'B'+i,
        bz: '-'
    };
    var data2 = {
        centre: 'DBG 信管中心',
        department: 'B'+i+' 信管部',
        office: 'B'+i+' IT 科',
        place: 'B'+i,
        bz: '-'
    };
    if(i == 1 || i == 4){
        data1.bz = '北京';
        data2.bz = '北京';
    }
    if(i == 2 || i == 7){
        data1.bz = '成都';
        data2.bz = '成都';
    }
    if(i==3 || i==5 || i==9){
        data1.bz = '合肥';
        data2.bz = '合肥';
    }
    if(i==8 || i==12){
        data1.bz = '重庆';
        data2.bz = '重庆';
    }
    if(i==6){
        data1.bz = '鄂尔多斯';
        data2.bz = '鄂尔多斯';
    }
    if(i==11){
        data1.bz = '四川绵阳';
        data2.bz = '四川绵阳';
    }
    if(i==17){
        data1.bz = '武汉';
        data2.bz = '武汉';
    }
    if(i==10){
        data1.bz = '福清';
        data2.bz = '福清';
    }
    deptData.push(data1);
    deptData.push(data2);
}

// 同步表结构
todolist.sync({
    force: true
});
state.sync({
    force: true
});
dept.sync({
    force: true
}).then(function(){
    dept.bulkCreate(deptData);
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

