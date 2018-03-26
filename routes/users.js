var express = require('express');
var router = express.Router();

var sequelize = require('../models/util/dbConnect.js');

var staffModel = require('../models/fom/staff.js');
var centreModel = require('../models/fom/centre.js');
var deptModel = require('../models/fom/dept.js');
var officeModel = require('../models/fom/office.js');
var stateModel = require('../models/state.js');
var postModel = require('../models/fom/post.js');

var dbGet = require('../dbController/db-index-get.js');

var checkLogin = require('../libs/middle/checkLogin.js').checkLogin;

// 获取中心，部门信息，科室列表
function getData(req,res,next){
  // var deptId = req.session.user.deptId;
  var deptId = 6;    //  便于测试，暂时禁止权限控制
  deptModel.findOne({where: {id: deptId}}).then(function(p1){
    res.locals.deptInfo = p1;
    var centreId = p1.centreId;
    officeModel.findAll({where: {deptId: deptId}}).then(function(p2){
      res.locals.officeList = p2;
      centreModel.findOne({where: {id: centreId}}).then(function(p3){
        res.locals.centreInfo = p3;
        next();
      });
    });
  });
}
// 获取状态选项
function getState(req,res,next){
  var page = 'fom';
  stateModel.findAll({where:{page: page}}).then(function(p){
    res.locals.stateList = p;
    next();
  });
}
// 获取岗位类别选项
function getPost(req,res,next){
  postModel.findAll().then(function(p){
    res.locals.postList = p;
    next();
  });
};

// 获取部门List
// function getDeptList(req,res,next){
//   var deptId = 6;
//   deptModel.findOne({where: {id: deptId}}).then(function(p1){
//     var centreId = p1.centreId;
//     deptMoel.findAll({where: {centreId: centreId}}).then(function(p2){
//       res.locals.deptList = p2;
//     });
//   });
// }

// 权限控制
// router.use(checkLogin);

/* page: users index. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// page: 更新FOM页面
router.get('/fom', getData, function(req,res,next){
	res.render('user/fom.ejs',{
		title: '更新人员FOM表'
	});
});

// data: 获取FOM dept table数据
router.get('/fom/bootstrapTable',function(req,res,next){
  // var deptId = req.session.user.deptId;
  var deptId = 6;    //  便于测试，暂时禁止权限控制
  dbGet.findStaffByDeptId(deptId, function(err,rows,fields){
    res.send(rows);
  });
});

// data: 根据centreId异步获取部门列表deptList
router.get('/fom/get/deptList', function(req,res,next){
  var centreId = req.query.centreId;
  deptModel.findAll({where: {centreId : centreId}}).then(function(p){
    res.send(p);
  });
});

// page: 获取添加人员表单
router.get('/fom/add',getData, getState, getPost, function(req,res,next){
  res.render('user/fom-add.ejs', {
    title: '添加新入职员工'
  });
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
  var mainPost = req.body.mainPost || '';
  var state = req.body.state;
  var bz = req.body.bz;
  if(centreId){
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
      mainPost: mainPost,
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
  }
});

// action: 离职
router.post('/fom/delete', function(req,res,next){
  var id = req.body.id;
  staffModel.destroy({
    where: {sid: id}
  }).then(function(p){
    res.send('delete success!');
  });
});

module.exports = router;
