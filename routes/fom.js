/**
 * FOM 表统计
 */
var express = require('express');
var router = express.Router();

var staff = require('../models/fom/staff.js');

// 获取FOM首页
router.get('/',function(req,res,next){
	res.render('pages/fom.ejs',{
		title: 'FOM管理页',
		page: 'fom'
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