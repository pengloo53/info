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

var checkLogin = require('../libs/middle/checkLogin.js').checkLogin;
var isCentreManager = require('../libs/middle/checkLogin.js').isCentreManager;

// 获取部门列表
function getDeptList(req,res,next){
  var centreId = 1; 
  deptModel.findAll({where: {centreId: centreId}}).then(function(p){
    res.locals.deptList = p;
    next();
  });
};

// 获取中心信息
function getCentreInfo(req,res,next){
  var centreId = 1; 
  centreModel.findOne({where: {id: centreId }}).then(function(p){
    res.locals.centreInfo = p;
    next();
  });
}

// 获取中心List
function getCentreList(req,res,next){
  centreModel.findAll().then(function(p){
    res.locals.centreList = p;
    next();
  });
}

// 权限控制
router.use(checkLogin, isCentreManager);

// 导航active
router.use(function(req,res,next){
  res.locals.page = 'fom';
  next();
});

// 获取FOM首页
router.get('/', getCentreInfo, function(req,res,next){
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

// page: 详表页面
router.get('/table',getDeptList,getCentreList, function(req,res,next){
  res.render('pages/fom-table.ejs',{
    title: 'FOM详表页'
  });
});

// 获取各部门首页
// router.get('/dept', function(req,res,next){
//     var dept = req.query.dept;
//     res.locals.dept = dept;
//     deptModel.findOne({where: {dept: dept}}).then(function(p1){  // 根据部门名称查部门信息
//       res.locals.deptInfo = p1;
//       var deptId = p1.id;
//       officeModel.findAll({where: {deptId: deptId}}).then(function(p2){
//         res.locals.officeList = p2;
//         next();
//       });
//     });
//   }, function(req,res,next){
//     res.render('pages/fom.ejs',{
//       title: 'FOM详情页',
//     });
// });

// 获取FOM dept table数据
router.get('/bootstrapTable', function(req,res,next){
    var centreId = 1;
    dbGet.findStaffByCentreId(centreId, function(err,rows,fields){
      res.send(rows);
    });
});

// 获取月报人员变动格式：
// select 
router.get('/getDetail', function(req,res,next){
  staffModel.findAll().then();
});

module.exports = router;