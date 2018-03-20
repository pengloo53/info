var express = require('express');
var router = express.Router();

var sequelize = require('../models/util/dbConnect.js');

var staffModel = require('../models/fom/staff.js');
var centreModel = require('../models/fom/centre.js');
var deptModel = require('../models/fom/dept.js');
var officeModel = require('../models/fom/office.js');

var dbGet = require('../dbController/db-index-get.js');

var checkLogin = require('../libs/middle/checkLogin.js').checkLogin;

// 获取中心，部门信息，科室列表
function getData(req,res,next){
  var deptId = req.session.user.deptId;
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

// 权限控制
router.use(checkLogin);

/* GET users index. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 更新FOM页面
router.get('/fom', getData, function(req,res,next){
	res.render('user/fom.ejs',{
		title: '更新人员FOM表'
	});
});

// 获取FOM dept table数据
router.get('/fom/bootstrapTable',function(req,res,next){
  // var whichDept = req.params.whichDept;
  var deptId = req.session.user.deptId;
  dbGet.findStaffByDeptId(deptId, function(err,rows,fields){
    res.send(rows);
  });
});

// 离职
router.post('/fom/delete', function(req,res,next){
  var id = req.body.id;
  staffModel.destroy({
    where: {sid: id}
  }).then(function(p){
    res.send('delete success!');
  });
});

module.exports = router;
