/**
 * FOM 表统计
 */
var express = require('express');
var router = express.Router();

var sequelize = require('../models/util/dbConnect.js');

var staffModel = require('../models/fom/staff.js');
var centreModel = require('../models/fom/centre.js');
var deptModel = require('../models/fom/dept.js');
var officeModel = require('../models/fom/office.js');

var dbGet = require('../dbController/db-index-get.js');

// var centreId = 1;
// 获取部门列表，中心信息
router.use(function(req,res,next){
  var centreId = 1; 
  res.locals.page = 'fom';
  centreModel.findOne({where: {id: centreId }}).then(function(p1){
    res.locals.centreInfo = p1;
    deptModel.findAll({where: {centreId: centreId}}).then(function(p2){
      res.locals.deptList = p2;
      next();
    });
  });
});

// 获取FOM首页
router.get('/', function(req,res,next){
  var centreId = 1;
  staffModel.findAll({
    attributes: ['mainPost',[sequelize.fn('COUNT',sequelize.col('mainPost')),'countMainPost']],
    group: 'mainPost'
  },{
    where : {centreId : centreId}
  }).then(function(p){
    res.render('pages/fom-index.ejs',{
      title: 'FOM首页',
      dept: 'index',
      mainPostCate: p
    });
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
router.get('/bootstrapTable/:whichDept',function(req,res,next){
  var whichDept = req.params.whichDept;
  if(whichDept && whichDept == 'dept'){
    var deptId = req.query.deptId;
    dbGet.findStaffByDeptId(deptId, function(err,rows,fields){
      res.send(rows);
    });
  }else if(whichDept && whichDept == 'centre'){
    var centreId = 1;
    dbGet.findStaffByCentreId(centreId, function(err,rows,fields){
      res.send(rows);
    });
  }
});

// 添加 FOM 人员
router.post('/add', function(req,res,next){
  var delId = req.body.id;
  res.send(delId);
});

// 删除 FOM 人员
router.post('/delete', function(req,res,next){
  var id = req.body.id;
  res.send(id);
});

// 获取月报人员变动格式：
// select 
router.get('/getDetail', function(req,res,next){
  staffModel.findAll().then();
});

module.exports = router;