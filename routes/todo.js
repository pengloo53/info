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
  var content = req.body.content.trim();
  var result = req.body.result.trim();
  var priority = req.body.priority.trim();
  var state = req.body.state.trim();
  var owner = req.body.owner.trim();
  var startDate = req.body.startDate.trim();
  var planFinishDate = req.body.planFinishDate.trim();
  var realFinishDate = req.body.realFinishDate.trim();
  if(title && content && result){
    todolist.create({
      title: title,
      content: content,
      result: result,
      priority: priority,
      state: state,
      owner: owner,
      startDate: startDate,
      planFinishDate: planFinishDate,
      realFinishDate: realFinishDate
    }).then(function (p) {
      console.log('created.' + JSON.stringify(p));
      res.send('success');
    }).catch(function (err) {
      console.log('failed: ' + err);
    });
  }
});

module.exports = router;