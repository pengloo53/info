var express = require('express');
var router = express.Router();

var sequelize = require('../models/util/dbConnect.js');

var staffModel = require('../models/fom/staff.js');
var centreModel = require('../models/fom/centre.js');
var deptModel = require('../models/fom/dept.js');
var officeModel = require('../models/fom/office.js');

var dbGet = require('../dbController/db-index-get.js');

// 检查登陆中间件
var checkLogin = require('../libs/middle/checkLogin.js').checkLogin;

// 获取数据中间件
var getCentreInfo = require('../libs/middle/getData.js').getCentreInfo;
var getDeptInfo = require('../libs/middle/getData.js').getDeptInfo;
var getCentreList = require('../libs/middle/getData.js').getCentreList;
var getDeptList = require('../libs/middle/getData.js').getDeptList;
var getOfficeList = require('../libs/middle/getData.js').getOfficeList;

var getStateList = require('../libs/middle/getData.js').getStateList;
var getDutyList = require('../libs/middle/getData.js').getDutyList;
var getPostList = require('../libs/middle/getData.js').getPostList;
var getPostTypeList = require('../libs/middle/getData.js').getPostTypeList;
var getGradeList = require('../libs/middle/getData.js').getGradeList;

// 权限控制
router.use(checkLogin);

// page: users index.
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// page: FOM表格页面
router.get('/fom', getOfficeList, getDeptInfo, getCentreList, function(req,res,next){
	res.render('user/fom.ejs',{
		title: '更新人员FOM表'
	});
});

// data: 获取FOM dept table数据 - bootstrap-table 数据
router.get('/fom/bootstrapTable',function(req,res,next){
  var deptId = req.session.user.deptId;
  // var deptId = 2;    //  便于测试，暂时禁止权限控制
  dbGet.findStaffByDeptId(deptId, function(err,rows,fields){
    res.send(rows);
  });
});

// data: 根据centreId异步获取部门列表deptList - 调转功能ajax前台获取
router.get('/fom/get/deptList', function(req,res,next){
  var centreId = req.query.centreId;
  deptModel.findAll({where: {centreId : centreId}}).then(function(p){
    res.send(p);
  });
});

// data: 根据deptId异步获取科室列表officeList - 调转功能ajax前台获取
router.get('/fom/get/officeList', function(req,res,next){
  var deptId = req.query.deptId;
  officeModel.findAll({where: {deptId : deptId}}).then(function(p){
    res.send(p);
  });
});

// page: 获取添加人员表单
router.get('/fom/add', getCentreInfo, getDeptInfo, getOfficeList, getStateList, getPostTypeList,getGradeList, function(req,res,next){
  res.render('user/add.ejs', {
    title: '添加新入职员工'
  });
});

// page: 获取显示人员页面
router.get('/fom/show',getDeptInfo, function(req,res,next){
  var userid = req.query.userid || '';
  if(userid){
    staffModel.findOne({where: {userid: userid}}).then(function(p){
      res.render('user/show.ejs', {
        title: '显示员工信息',
        staffInfo: p
      });
    });
  }else{
    res.redirect('/user/fom');
  }
});

// page: 编辑岗位信息页面 - edit.ejs
router.get('/fom/edit',getDeptInfo,getGradeList,getDutyList, getStateList, getPostList, getPostTypeList, function(req,res,next){
  var userid = req.query.userid || '';
  if (userid){
    staffModel.findOne({where: {userid: userid}}).then(function(p){
      res.render('user/edit.ejs', {
        title: '编辑员工岗位信息',
        staffInfo: p
      });
    });
  }else{
    res.redirect('/user/fom');
  }
});

// action: 更新岗位信息 - edit page
router.post('/fom/edit', function(req,res,next){
  var userid = req.body.userid || '';
  var duty = req.body.duty || '';
  var grade = req.body.grade || '';
  var mainPost = req.body.mainPost || '';
  var subPost = req.body.subPost || '';
  var postType = req.body.postType || '';
  var state = req.body.state || '';
  var postDescribe = req.body.postDescribe || '';
  if(userid){
    staffModel.update(
      {duty: duty,grade:grade,mainPost:mainPost,subPost:subPost,postType:postType,state:state,postDescribe:postDescribe},
      {where: {userid: userid}},
      {fields: [duty,grade,mainPost,subPost,postType,state,postDescribe]}
    ).then(function(){
      req.flash('success','成功更新岗位信息');
      res.redirect('/user/fom/show?userid='+ userid);
    });
  }
  // console.log('userid is %s, duty is %s, grade is %s' , userid, duty, grade);
});

// action: 新入职
router.post('/fom/add', function(req,res,next){
  var centreId = req.body.centre || 0;
  var deptId = req.body.dept || 0;
  var officeId = req.body.office || 0;
  var name = req.body.name || '';
  var userid = req.body.userid || '';
  var gender = req.body.gender || '';
  var school = req.body.school || '';
  var major = req.body.major || '';
  var education = req.body.education || '';
  var graduation_date = req.body.graduation_date || '';
  var work_date = req.body.work_date || '';
  var enter_date = req.body.enter_date || '';
  var birthday = req.body.birthday || '';
  var birth_place = req.body.birth_place || '';
  var domicile_place = req.body.domicile_place || '';
  var grade = req.body.grade || '';
  var postType = req.body.postType || '';
  var state = req.body.state;
  var bz = req.body.bz;
  if(centreId && deptId && officeId && name && userid && gender && state && postType && grade){
    staffModel.create({
      centreId : centreId,
      deptId : deptId,
      officeId: officeId,
      name : name,
      userid: userid,
      gender: gender,
      school: school,
      major: major,
      education: education,
      graduation_date: graduation_date,
      work_date: work_date,
      enter_date: enter_date,
      birthday: birthday,
      birth_place: birth_place,
      domicile_place: domicile_place,
      grade: grade,
      postType: postType,
      state: state,
      bz: bz
    }).then(function (p) {
      console.log('created.' + JSON.stringify(p));
      // 添加log
      
      req.flash('success', '添加成功');
      res.redirect('/user/fom');
    }).catch(function (err) {
      console.log('failed: ' + err);
    });
  }else{
    req.flash('error','请填写完整再提交');
    res.redirect('/user/fom/add');
  }
});

// action: update grade 更新职级 - 取消在table上直接更新
// router.post('/fom/update/grade', function(req,res,next){
//   var id = req.body.pk;
//   var grade = req.body.value || '';
//   staffModel.update(
//     {grade: grade},
//     {where: {sid: id}},
//     {fields: [grade]}
//   ).then(function(){
//     res.send('更新职级成功');
//   });
// });

// action: 离职
router.post('/fom/dimission', function(req,res,next){
  var id = req.body.id;
  var leave_date = req.body.leave_date || '';
  var bz = req.body.bz || '';
  staffModel.update(
    {'sbz': bz,'leave_date': leave_date},
    {'where': {sid: id}},
    {'fields': ['leave_date','sbz']}
  ).then(function(){
    staffModel.destroy({where:{sid: id}}).then(function(){
      req.flash('success', '离职操作成功');
      res.redirect('/user/fom');
    });
  });
});

// action: 调转
router.post('/fom/change', function(req,res,next){
  var id = req.body.id;
  var centreId = req.body.centre || 0;
  var deptId = req.body.dept || 0;
  var officeId = req.body.office || 0;
  // console.log('centreId is %d, deptId is %d , officeId is %d', centreId ,deptId , officeId);
  staffModel.update(
    {centreId : centreId, deptId : deptId, officeId: officeId},
    {where: {sid: id}},
    {fields: [centreId,deptId,officeId]}
  ).then(function(){
      req.flash('success', '调转操作成功');
      res.redirect('/user/fom');
  });
});

module.exports = router;
