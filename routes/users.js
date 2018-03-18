var express = require('express');
var router = express.Router();

var sequelize = require('../models/util/dbConnect.js');

var staffModel = require('../models/fom/staff.js');
var centreModel = require('../models/fom/centre.js');
var deptModel = require('../models/fom/dept.js');
var officeModel = require('../models/fom/office.js');

var dbGet = require('../dbController/db-index-get.js');

var checkLogin = require('../libs/middle/checkLogin.js').checkLogin;

// 获取部门列表
router.use(checkLogin, function(req,res,next){
  var deptId = req.session.user.deptId;
  deptModel.findOne({where: {id: deptId}}).then(function(p1){
    res.locals.deptInfo = p1;
    officeModel.findAll({where: {deptId: deptId}}).then(function(p2){
      res.locals.officeList = p2;
      next();
    });
  });
});

/* GET users index. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 更新FOM页面
router.get('/fom', function(req,res,next){
	res.render('user/fom.ejs',{
		title: '更新人员FOM表'
	});
});

module.exports = router;
