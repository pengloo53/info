/**
 * Project 项目信息
 */
var express = require('express');
var router = express.Router();

var project = require('../models/project/project.js');

// 获取project首页
router.get('/',function(req,res,next){
	res.render('pages/project.ejs',{
		title: '项目管理页',
		page: 'project'
	});
});
// 获取FOM表格式：
// select d.department,d.office,s.name,s.gender,s.grade,s.mainPost,s.subPost,s.postType,s.postDescribe,s.bz from staff s left join dept d where s.deptId = d.id;
// router.get('/getFom',function(req,res,next){
//   staff.findAll().then();
// });

// 获取月报人员变动格式：
// select 
// router.get('/getDetail', function(req,res,next){
//   staff.findAll().then();
// });

module.exports = router;