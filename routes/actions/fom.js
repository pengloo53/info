var express = require('express');
var router = express.Router();

var sequelize = require('../../models/util/dbConnect.js');

var staffModel = require('../../models/fom/staff.js');
var centreModel = require('../../models/fom/centre.js');
var deptModel = require('../../models/fom/dept.js');
var officeModel = require('../../models/fom/office.js');
var logModel = require('../../models/log.js');
var userModel = require('../../models/user/user.js');

var dbGet = require('../../dbController/db-index-get.js');

// 检查登陆中间件
var checkLogin = require('../../libs/middle/checkLogin.js').checkLogin;
var isCentreManager = require('../../libs/middle/checkLogin.js').isCentreManager;

// 获取数据中间件
var getCentreInfo = require('../../libs/middle/getData.js').getCentreInfo;
var getDeptInfo = require('../../libs/middle/getData.js').getDeptInfo;
var getCentreList = require('../../libs/middle/getData.js').getCentreList;
var getDeptList = require('../../libs/middle/getData.js').getDeptList;
var getOfficeList = require('../../libs/middle/getData.js').getOfficeList;

var getStateList = require('../../libs/middle/getData.js').getStateList;
var getDutyList = require('../../libs/middle/getData.js').getDutyList;
var getPostList = require('../../libs/middle/getData.js').getPostList;
var getPostTypeList = require('../../libs/middle/getData.js').getPostTypeList;
var getGradeList = require('../../libs/middle/getData.js').getGradeList;

// 工具类
// var getIp = require('../../libs/util/myUtil.js').getIp;
// var getAes = require('../../libs/util/crypto-aes.js').getAes;
// var getDAes = require('../../libs/util/crypto-aes.js').getDAes;
var base64encode = require('../../libs/util/base64.js').base64encode;
var base64decode = require('../../libs/util/base64.js').base64decode;
var addLog = require('../../libs/util/log.js').addLog;

// action: 更新信息 - admin edit page
router.post('/staff/edit', function(req,res,next){
  var sid_code = req.body.sid_code;
  var sid = base64decode(sid_code);
  var userid = req.body.userid || '';
  var name = req.body.name;
  var gender = req.body.gender;
  var school = req.body.school || '';
  var major = req.body.major || '';
  var education = req.body.education || '';
  var graduation_date = req.body.graduation_date || '';
  var work_date = req.body.work_date || '';
  var enter_date = req.body.enter_date || '';
  var birthday = req.body.birthday || '';
  var birth_place = req.body.birth_place || '';
  var domicile_place = req.body.domicile_place || '';
  var duty = req.body.duty || '';
  var grade = req.body.grade || '';
  var mainPost = req.body.mainPost || '';
  var subPost = req.body.subPost || '';
  var postType = req.body.postType || '';
  var state = req.body.state || '';
  var postDescribe = req.body.postDescribe || '';
  // 用户名
  var username = req.session.user.username;
  if(sid_code){
    staffModel.update(
      {userid: userid,gender: gender, school:school,major:major,education: education,
        graduation_date: graduation_date,work_date:work_date,enter_date:enter_date,
        birthday:birthday,birth_place:birth_place,domicile_place:domicile_place,
        duty: duty,grade:grade,mainPost:mainPost,subPost:subPost,postType:postType,state:state,
        postDescribe:postDescribe},
      {where: {sid: sid}}
    ).then(function(){
      addLog(req, 'fom', '更新信息', name, JSON.stringify({}), JSON.stringify({}));
      // req.flash('success','成功更新岗位信息');
      res.redirect('/admin/staff/show?sid_code='+ sid_code);
    });
  }else{
    next();
  }
});

// action: 更新岗位信息 - edit page
router.post('/staff/editPost', function(req,res,next){
  var sid_code = req.body.sid_code || '';
  var sid = base64decode(sid_code);
  var userid = req.body.userid || '';
  var duty = req.body.duty || '';
  var grade = req.body.grade || '';
  var mainPost = req.body.mainPost || '';
  var subPost = req.body.subPost || '';
  var postType = req.body.postType || '';
  var state = req.body.state || '';
  var postDescribe = req.body.postDescribe || '';
  var name = req.body.name;
  var username = req.session.user.username;
  if(sid_code){
    staffModel.update(
      {duty: duty,grade:grade,mainPost:mainPost,subPost:subPost,postType:postType,state:state,postDescribe:postDescribe},
      {where: {sid: sid}},
      {fields: [duty,grade,mainPost,subPost,postType,state,postDescribe]}
    ).then(function(){
      addLog(req, 'fom', '更新岗位', name, JSON.stringify({}), JSON.stringify({}));
      req.flash('success','成功更新岗位信息');
      res.redirect('/admin/staff/show?sid_code='+ sid_code);
    });
  }else{
    next();
  }
});

// action: 新入职
router.post('/staff/add', function(req,res,next){
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
  var username = req.session.user.username;
  var data = {
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
    sbz: bz
  };
  if(centreId && deptId && officeId && name && userid && gender && state && postType && grade){
    staffModel.create(data).then(function (p) {
      console.log('created.' + JSON.stringify(p));
      // 添加log
      addLog(req, 'fom', '新入职', name, '', JSON.stringify({员工号: userid, 姓名: name}));
      req.flash('success', '添加成功');
      res.redirect('/admin/table');
    }).catch(function (err) {
      console.log('failed: ' + err);
    });
  }else{
    res.send('请填写完整再提交');
    // res.redirect('/admin/staff/add');
  }
});

// action: update userid 填补员工号
router.post('/staff/update/userid', function(req,res,next){
  var id = req.body.pk;
  var userid = req.body.value || '';
  staffModel.update(
    {userid: userid.trim()},
    {where: {sid: id}},
    {fields: [userid]}
  ).then(function(){
    res.send('更新成功');
  });
});

// action: 离职
router.post('/staff/dimission', function(req,res,next){
  var sid = req.body.sid;
  var userid = req.body.userid;
  var name = req.body.name;
  var leave_date = req.body.leave_date || '';
  var bz = req.body.bz || '';
  var username = req.session.user.username;
  staffModel.update(
    {'sbz': bz,'leave_date': leave_date},
    {'where': {sid: sid}},
    {'fields': ['leave_date','sbz']}
  ).then(function(){
    staffModel.destroy({where:{sid: sid}}).then(function(){
      // add log
      addLog(req, 'fom', '离职', name, JSON.stringify({员工号: userid, 姓名: name}), '');
      req.flash('success', '离职操作成功');
      res.redirect('/admin/staff/table');
    });
  });
});

// action: 调转
router.post('/staff/change', function(req,res,next){
  var id = req.body.id;
  var centreId = req.body.centre || 0;
  var deptId = req.body.dept || 0;
  var officeId = req.body.office || 0;
  var name = req.body.name;
  var oldDept = req.body.oldDept;
  var username = req.session.user.username;
  staffModel.update(
    {centreId : centreId, deptId : deptId, officeId: officeId},
    {where: {sid: id}},
    {fields: [centreId,deptId,officeId]}
  ).then(function(){
      deptModel.findOne({where: {id: deptId}}).then(function(p){
        // add log
        addLog(req, 'fom', '调出', name, oldDept, p.dept);
        req.flash('success', '调转操作成功');
        res.redirect('/admin/staff/table');
      }); 
  });
});


module.exports = router;