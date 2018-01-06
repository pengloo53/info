var express = require('express');
var router = express.Router();
// 引入数据模型
var todolist = require('../models/todolist.js');
var state = require('../models/state.js');
var priority = require('../models/priority.js');

router.get('/bootstrapTable/todo', function(req, res, next) {
    var result = [];
    var testData = {
        title: 'TEST1',
        content: 'Content',
        result: 'Your want ',
        priority: '重要紧急'
    };
    result.push(testData);
    res.send(result);
});

router.get('/get/:table',function(req,res,next){
    var table = req.params.table || '';
    switch(table){
        case 'priority':
            priority.findAll().then(function(r){
                res.send(r);
            });
            break;
        case 'state':
            state.findAll().then(function(r){
                res.send(r);
            });
            break;
        default:
            res.send([]);
    }    
});

module.exports = router;