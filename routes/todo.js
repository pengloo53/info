var express = require('express');
var router = express.Router();

// 引入todolist数据模型
var todolist = require('../models/todolist.js');

/* GET users listing. */
router.get('/', function (req, res, next) {
  // res.send('respond with a resource');
  res.render('pages/todo.ejs', {
    title: '任务清单',
  });
});

// add todolist
router.post('/add', function (req, res, next) {
  var title = req.body.title.trim();
  var content = req.body.content.trim() || '-';
  var result = req.body.result.trim() || '-';
  var priority = req.body.priority.trim();
  var state = 1;
  var startDate = req.body.startDate.trim();
  var planFinishDate = req.body.planFinishDate.trim();
  // var officer = req.session.user.name || '-';
  var officer = '-';
  if(title && priority && startDate && planFinishDate){
    todolist.create({
      title: title,
      content: content,
      result: result,
      priority: priority,
      state: state,
      officer: officer,
      startDate: startDate,
      planFinishDate: planFinishDate
    }).then(function (p) {
      console.log('created.' + JSON.stringify(p));
      res.send('success');
    }).catch(function (err) {
      console.log('failed: ' + err);
    });
  }
});

// delete
router.post('/delete', function(req,res,next){
  var id = req.body.id || '';
  if(id){
    todolist.destroy({
      where: {
        id: id
      }
    }).then(function(p){
      console.log('delete.' + JSON.stringify(p));
      res.send('delete success');
    });
  }else{
    res.send('del error');
  }
});
// update all
router.post('/updateAll', function(req,res,next){
  var title = req.body.title;
  var content = req.body.content;
  var result = req.body.result;
  var startDate = req.body.startDate;
  var planFinishDate = req.body.planFinishDate;
  var realFinishDate = req.body.realFinishDate;
  var priority = req.body.priority;
  var bz = req.body.bz;
  var id = req.body.id;
  todolist.update({
    title: title,
    content: content,
    result: result,
    startDate: startDate,
    planFinishDate: planFinishDate,
    realFinishDate: realFinishDate,
    priority: priority,
    bz: bz
  },{
    where: {
      id: id
    }
  }).then(function(p){
    res.send('update all success');
  });
});
// update element
router.post('/update', function(req,res,next){
  var value = req.body.value || '';
  var name = req.body.name || '';
  var id = req.body.pk;
  // console.log('id=' + id + ', name=' + name + ',value: '+ value);
  if(name && value && name == 'owner'){
    todolist.update({
      owner: value
    },{
      where: {
        'id': id
      }
    }).then(function(p){
      console.log('update.' + JSON.stringify(p));
      res.send('update owner success');
    });
  }else if(name && name == 'realFinishDate'){
    var state = value?3:2;
    todolist.update({
      realFinishDate: value,
      state: state
    },{
      where: {
        id: id
      }
    }).then(function(p){
      console.log('update.' + JSON.stringify(p));
      res.send('update realFinishDate success');
    });
  }else{
    res.send('error');
  }
});

// find: 获取table的数据
router.get('/bootstrapTable', function (req, res, next) {
  todolist.findAll({
    order: [['id', 'desc']]
  }).then(function (r) {
    res.send(r);
  });
});

module.exports = router;