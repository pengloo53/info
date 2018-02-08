var express = require('express');
var router = express.Router();
// 引入数据模型
var todolist = require('../models/todo/todolist.js');
var state = require('../models/todo/state.js');

// 获取table的数据
router.get('/bootstrapTable/todo', function(req, res, next) {
    todolist.findAll({
        order: [['id','desc']]
    }).then(function(r){
        res.send(r);
    });
});

// 获取select选项数据
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

router.get('/convert/:table', function(req,res,next){
    var table = req.params.table || '';
    var id = req.query.id;
    switch(table){
        case 'priority':
            priority.findOne({
                where: {
                    id: id
                }
            }).then(function(r){
                res.send(r.title);
            });
            break;
        case 'state':
            state.findOne({
                where: {
                    id: id
                }
            }).then(function(r){
                res.send(r.title);
            });
            break;
        default:
            res.send('');
    }
});

module.exports = router;