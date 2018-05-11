var express = require('express');
var router = express.Router();

var sequelize = require('../../models/util/dbConnect.js');

var staffModel = require('../../models/fom/staff.js');
var userModel = require('../../models/user/user.js');

var dbGet = require('../../dbController/db-index-get.js');

var checkLogin = require('../../libs/middle/checkLogin.js').checkLogin;
var isCentreManager = require('../../libs/middle/checkLogin.js').isCentreManager;

// 获取数据中间件
var getCentreInfo = require('../../libs/middle/getData.js').getCentreInfo;
var getDeptInfo = require('../../libs/middle/getData.js').getDeptInfo;
var getCentreList = require('../../libs/middle/getData.js').getCentreList;
var getDeptList = require('../../libs/middle/getData.js').getDeptList;
var getOfficeList = require('../../libs/middle/getData.js').getOfficeList;
var getTotalByCentreId = require('../../libs/middle/getData.js').getTotalByCentreId;

var getStateList = require('../../libs/middle/getData.js').getStateList;
var getDutyList = require('../../libs/middle/getData.js').getDutyList;
var getPostList = require('../../libs/middle/getData.js').getPostList;
var getPostTypeList = require('../../libs/middle/getData.js').getPostTypeList;
var getGradeList = require('../../libs/middle/getData.js').getGradeList;

var getStaffListByCentreId = require('../../libs/middle/getData.js').getStaffListByCentreId;

// 工具类
// var getAes = require('../../libs/util/crypto-aes.js').getAes;
// var getDAes = require('../../libs/util/crypto-aes.js').getDAes;
var base64encode = require('../../libs/util/base64.js').base64encode;
var base64decode = require('../../libs/util/base64.js').base64decode;
var addLog = require('../../libs/util/log.js').addLog;

// 获取员工信息，根据sid
function getStaffInfo(req,res,next){
  var sid_code = req.query.sid_code;
  if(!sid_code){ return res.redirect('/admin/staff/table');}
  var sid = base64decode(sid_code);  // 解密
  staffModel.findOne({where: {sid: sid}}).then(function(p){
    if(!p){return res.redirect('/admin/staff/table');}
    res.locals.staffInfo = p;
    res.locals.sid_code = sid_code;
    next();
  });
}

// 检查登陆
router.use(checkLogin);

// 控制权限
router.use(isCentreManager);

// page: index
router.get('/', getCentreInfo,getTotalByCentreId,function(req,res,next){
  // 计算中心人员答编比率，保留2位小数
  res.locals.sumPercent = Math.floor(res.locals.total / res.locals.centreInfo.preparation * 100 * 100) / 100;
  res.render('admin/fom-index.ejs',{
    title: '后台管理总览'
  });
});

// page: config 用户管理
router.get('/user',function(req,res,next){
  var centreId = req.session.user.centreId;
  dbGet.getUserList(centreId, function(err,rows,fields){
    res.locals.userList = rows;
    next();
  });
}, getDeptList, function(req,res,next){
  res.render('admin/config-user.ejs',{
    title: '用户配置'
  });
});

// page: organization 组织管理 部门详情
router.get('/dept', getDeptList, function(req,res,next){
  res.render('admin/org-dept.ejs', {
    title: '部门详情'
  });
});
// page: organization 科室详情
router.get('/office', getDeptInfo, getOfficeList, function(req,res,next){
  res.render('admin/org-office.ejs', {
    title: '科室详情'
  });
});

// page: 后台配置 - 岗位管理
router.get('/post', getPostList,getDutyList,getGradeList,getStateList, function(req,res,next){
  res.render('admin/config-post.ejs',{
    title: '岗位配置'
  });
});

// page: table
router.get('/staff/table', getCentreInfo , getCentreList, getDeptList, getStaffListByCentreId, function(req,res,next){
  res.render('admin/fom-table.ejs',{
    title: '人员总表'
  });
});

// page: show staff
router.get('/staff/show', getStaffInfo, function(req,res,next){
  res.render('admin/fom-show.ejs', {
    title: '显示员工信息'
  });
});

// page: edit staff 
router.get('/staff/edit',getStaffInfo, getGradeList,getDutyList, getStateList, getPostList, getPostTypeList,function(req,res,next){
  res.render('admin/fom-edit.ejs', {
    title: '编辑员工信息'
  });
});

// page: add staff
router.get('/staff/add', getCentreInfo, getDeptList, getDutyList, getStateList, getPostTypeList,getGradeList,function(req,res,next){
  res.render('admin/fom-add.ejs', {
    title: '添加新入职员工'
  });
});

module.exports = router;