var express = require('express');
var router = express.Router();

var sequelize = require('../models/util/dbConnect.js');

var staffModel = require('../models/fom/staff.js');
var centreModel = require('../models/fom/centre.js');
var deptModel = require('../models/fom/dept.js');
var officeModel = require('../models/fom/office.js');
var logModel = require('../models/log.js');
var userModel = require('../models/user/user.js');

var dbGet = require('../dbController/db-index-get.js');

var checkLogin = require('../libs/middle/checkLogin.js').checkLogin;
var isCentreManager = require('../libs/middle/checkLogin.js').isCentreManager;

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
var getStaffInfo = require('../libs/middle/getData.js').getStaffInfo;

var getStaffListByCentreId = require('../libs/middle/getData.js').getStaffListByCentreId;

// 工具类
var getIp = require('../libs/util/myUtil.js').getIp;

// add log
function addLog(req, action, name, oldData, newData){
  var username = req.session.user.username;
  var ip = getIp(req);
  logModel.create({page: 'fom', username: username,action: action, name: name, oldData: oldData, newData: newData,ip:ip}).then(function(p){
    console.log('created.' + JSON.stringify(p));
  }).catch(function(err){
    console.log('failed: ' + err);
  });
}

// 检查登陆
router.use(checkLogin);

// 控制权限
router.use(isCentreManager);

router.use(function(req,res,next){
    res.locals.user = req.session.user;
    next();
});
// page: index
router.get('/', getCentreInfo,function(req,res,next){
    res.render('admin/index.ejs',{
        title: '后台管理总览'
    });
});

// page: table
router.get('/table', getCentreInfo , getDeptList, getStaffListByCentreId, function(req,res,next){
    res.render('admin/table.ejs',{
        title: '总表'
    });
});

// page: show staff
router.get('/staff/show',getDeptInfo, function(req,res,next){
  var userid = req.query.userid || '';
  if(userid){
    staffModel.findOne({where: {userid: userid}}).then(function(p){
      res.render('admin/show.ejs', {
        title: '显示员工信息',
        staffInfo: p
      });
    });
  }else{
    res.redirect('/admin/table');
  }
});

// page: edit staff 
router.get('/staff/edit', getDeptInfo,getGradeList,getDutyList, getStateList, getPostList, getPostTypeList,getStaffInfo, 
    function(req,res,next){
      var userid = req.query.userid || '';
      if(userid){
        res.render('admin/edit.ejs', {
          title: '编辑员工信息'
        });
      }else{
        res.redirect('/admin/table');
      }
});

// action: 更新岗位信息 - edit page
router.post('/staff/edit', function(req,res,next){
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
  if(userid){
    staffModel.update(
      {gender: gender, school:school,major:major,education: education,
        graduation_date: graduation_date,work_date:work_date,enter_date:enter_date,
        birthday:birthday,birth_place:birth_place,domicile_place:domicile_place,
        duty: duty,grade:grade,mainPost:mainPost,subPost:subPost,postType:postType,state:state,
        postDescribe:postDescribe},
      {where: {userid: userid}},
      {fields: [duty,grade,mainPost,subPost,postType,state,postDescribe]}
    ).then(function(){
      addLog(req, '更新信息', name, JSON.stringify({}), JSON.stringify({}));
      // req.flash('success','成功更新岗位信息');
      res.redirect('/admin/staff/show?userid='+ userid);
    });
  }else{
    next();
  }
});


module.exports = router;