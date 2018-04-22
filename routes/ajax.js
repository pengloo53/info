var express = require('express');
var router = express.Router();

var dbGet = require('../dbController/db-index-get.js');

// 检查登陆中间件
var checkLogin = require('../libs/middle/checkLogin.js').checkLogin;

// 检查登陆
router.use(checkLogin);

// admin index 图表分类
router.post('/fom/getGroupFromCentre', function(req,res,next){
  var centreId = req.session.user.centreId;
  var group = req.body.group;
  dbGet.getGroupFromCentre(centreId, group, function(err,rows,fields){
    res.send(rows);
  });
});

// admin index 计数
router.post('/fom/getCountFromCentre', function(req,res,next){
  var centreId = req.session.user.centreId;
  var name = req.body.name;
  dbGet.getCountFromCentre(centreId, name, function(err, rows, fields){
    res.send(rows);
  });
});

module.exports = router;