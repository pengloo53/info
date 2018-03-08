/**
 * FOM 表统计
 */
var express = require('express');
var router = express.Router();

var staff = require('../models/fom/staff.js');
var dept = require('../models/fom/dept.js');

// 获取FOM首页
router.get('/',function(req,res,next){
  var centreId = 1;
  dept.findAll({where: {centreId: centreId}}).then(function(p){
    res.render('pages/fom-index.ejs',{
      title: 'FOM首页',
      page: 'fom',
      depts: p
    });
  });
});

// 获取FOM dept table数据
router.get('/bootstrapTable',function(req,res,next){
  staff.findAll({
    where: {
      deptId: 1 
    }
  }).then(function(p){
    res.send(p);
  });
});

// router.get('/test', function(req,res,next){
//   res.render('pages/test.ejs',{
//     title: 'TEST',
//     page: 'fom'
//   });
// });

// 获取各部门信息
router.get('/dept/:dept', function(req,res,next){
  var dept = req.params.dept;
  staff.findAll({
    where: {
      deptId: 1 
    }
  }).then(function(p){
      res.render('pages/fom.ejs',{
        page: 'fom',
        title: 'FOM详情页',
        dept: dept,
        depts: p
    });
  });
  
});


// 获取FOM表格式：
// select d.department,d.office,s.name,s.gender,s.grade,s.mainPost,s.subPost,s.postType,s.postDescribe,s.bz from staff s left join dept d where s.deptId = d.id;
router.get('/getFom',function(req,res,next){
  staff.findAll().then();
});

// 获取月报人员变动格式：
// select 
router.get('/getDetail', function(req,res,next){
  staff.findAll().then();
});

module.exports = router;