var express = require('express');
var router = express.Router();

var staffModel = require('../../models/fom/staff.js');
var centreModel = require('../../models/fom/centre.js');
var deptModel = require('../../models/fom/dept.js');
var officeModel = require('../../models/fom/office.js');
var logModel = require('../../models/log.js');
var userModel = require('../../models/user/user.js');

var dbGet = require('../../dbController/db-index-get.js');

var checkLogin = require('../../libs/middle/checkLogin.js').checkLogin;
var isCentreManager = require('../../libs/middle/checkLogin.js').isCentreManager;

// 检查登陆
router.use(checkLogin);

// 控制权限
router.use(isCentreManager);

// table: 获取中心 table数据
router.get('/bootstrapTable', function(req,res,next){
    var centreId = req.session.user.centreId;
    dbGet.findStaffByCentreId(centreId, function(err,rows,fields){
      res.send(rows);
    });
});

// ajax: 根据centreId异步获取部门列表deptList - 调转功能ajax前台获取
router.get('/ajax/getDeptList', function(req,res,next){
  var centreId = req.query.centreId;
  deptModel.findAll({where: {centreId : centreId}}).then(function(p){
    res.send(p);
  });
});

// ajax: 根据deptId异步获取科室列表officeList - 调转功能ajax前台获取
router.get('/ajax/getOfficeList', function(req,res,next){
  var deptId = req.query.deptId;
  officeModel.findAll({where: {deptId : deptId}}).then(function(p){
    res.send(p);
  });
});

// ajax: admin index 图表分类
router.post('/ajax/getGroupFromCentre', function(req,res,next){
  var centreId = req.session.user.centreId;
  var group = req.body.group;
  dbGet.getGroupFromCentre(centreId, group, function(err,rows,fields){
    res.send(rows);
  });
});

// ajax: admin index 计数
router.post('/ajax/getCountFromCentre', function(req,res,next){
  var centreId = req.session.user.centreId;
  var name = req.body.name;
  dbGet.getCountFromCentre(centreId, name, function(err, rows, fields){
    res.send(rows);
  });
});

module.exports = router;