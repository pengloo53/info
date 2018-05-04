var express = require('express');
var router = express.Router();

var centreModel = require('../../models/fom/centre.js');
var deptModel = require('../../models/fom/dept.js');
var officeModel = require('../../models/fom/office.js');

var dbGet = require('../../dbController/db-index-get.js');

// 检查登陆中间件
var checkLogin = require('../../libs/middle/checkLogin.js').checkLogin;
var isCentreManager = require('../../libs/middle/checkLogin.js').isCentreManager;


// 检查登陆
router.use(checkLogin);

// 控制权限
router.use(isCentreManager);


module.exports = router;