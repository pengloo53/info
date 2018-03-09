/**
 * FOM 表统计
 */
var express = require('express');
var router = express.Router();

var staffModel = require('../models/fom/staff.js');
var deptModel = require('../models/fom/dept.js');


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
    deptModel.findOne({where: {dept: dept}}).then(function(p){
      res.locals.deptInfo = p;
      next();
    });
  }, function(req,res,next){
    res.render('pages/fom.ejs',{
      title: 'FOM详情页',
    });
});

// 获取FOM dept table数据
router.get('/bootstrapTable',function(req,res,next){
  staffModel.findAll({
    where: {
      deptId: 1 
    }
  }).then(function(p){
    res.send(p);
  });
});


// 获取FOM表格式：
// select d.department,d.office,s.name,s.gender,s.grade,s.mainPost,s.subPost,s.postType,s.postDescribe,s.bz from staff s left join dept d where s.deptId = d.id;
router.get('/getFom',function(req,res,next){
  staffModel.findAll().then();
});

// 获取月报人员变动格式：
// select 
router.get('/getDetail', function(req,res,next){
  staffModel.findAll().then();
});

module.exports = router;