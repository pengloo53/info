/**
 * FOM 表统计
 */
var express = require('express');
var router = express.Router();

var staffModel = require('../models/fom/staff.js');
var deptModel = require('../models/fom/dept.js');
var officeModel = require('../models/fom/office.js');

var dbGet = require('../dbController/db-index-get.js');

// 获取部门列表
router.use(function(req,res,next){
  var centreId = 1; 
  deptModel.findAll({where: {centreId: centreId}}).then(function(p){
    res.locals.deptList = p;
    res.locals.page = 'fom';
    next();
  });
});

// 获取FOM首页
router.get('/', function(req,res,next){
  res.render('pages/fom-index.ejs',{
    title: 'FOM首页',
    dept: 'index',
  });
});

// 获取各部门首页
router.get('/dept', function(req,res,next){
    var dept = req.query.dept;
    res.locals.dept = dept;
    deptModel.findOne({where: {dept: dept}}).then(function(p1){  // 根据部门名称查部门信息
      res.locals.deptInfo = p1;
      var deptId = p1.id;
      officeModel.findAll({where: {deptId: deptId}}).then(function(p2){
        res.locals.officeList = p2;
        next();
      });
    });
  }, function(req,res,next){
    res.render('pages/fom.ejs',{
      title: 'FOM详情页',
    });
});

// 获取FOM dept table数据
router.get('/bootstrapTable',function(req,res,next){
  var deptId = req.query.deptId;
  dbGet.findStaffByDeptId(deptId, function(err,rows,fields){
    res.send(rows);
  });
});

// 获取月报人员变动格式：
// select 
router.get('/getDetail', function(req,res,next){
  staffModel.findAll().then();
});

module.exports = router;