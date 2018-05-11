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

// ajax: 操作部门信息, jquery-tabledit 插件
router.post('/ajax/jqueryTabledit/dept', function(req,res,next){
  var action = req.body.action;
  var id = req.body.id;
  var plant = req.body.plant || '';
  var place = req.body.place || '';
  var owner = req.body.owner || '';
  var preparation = req.body.preparation || 0;
  var bz = req.body.bz || '';
  var dept = req.body.dept || '';
  if(action === 'edit'){
    var updateData = {plant: plant,place: place,owner: owner, preparation: preparation, bz: bz, dept: dept};
    deptModel.update(updateData,{
      where: {id: id}
    }).then(function(p){
      res.send(JSON.stringify({message: 'update success'}));  // jquery tabledit 要求返回json
    });
  }else if(action === 'delete'){
    deptModel.destroy({
      where: {id : id}
    }).then(function(p){
      res.send(JSON.stringify({message: 'delete success'}));  // jquery tabledit 要求返回json
    });
  }else if(action === 'restore'){
    deptModel.restore({
      where : {id: id}
    }).then(function(p){
      res.send(JSON.stringify({message: 'cancel success'}));
    });
  }
});

// ajax: jquery-tabledit 操作科室信息
router.post('/ajax/jqueryTabledit/office', function(req,res,next){
  var action = req.body.action;
  var id = req.body.id;
  var office = req.body.office || '';
  var owner = req.body.owner;
  var preparation = req.body.preparation;
  var bz = req.body.bz || '';
  if(action === 'edit'){
    var updateData = {office: office, owner: owner, preparation: preparation, bz: bz};
    officeModel.update(updateData,{
      where: {id: id}
    }).then(function(p){
      res.send(JSON.stringify({message: 'update success'}));
    });
  }else if(action === 'delete'){
    officeModel.destroy({
      where: {id : id}
    }).then(function(p){
      res.send(JSON.stringify({message: 'delete success'}));  // jquery tabledit 要求返回json
    });
  }else if(action === 'restore'){
    officeModel.restore({
      where : {id: id}
    }).then(function(p){
      res.send(JSON.stringify({message: 'cancel success'}));
    });
  }
});

// action: add dept
router.post('/addDept', function(req,res,next){
  var dept = req.body.deptModal.trim();
  var owner = req.body.owerModal.trim();
  var centreId = req.session.user.centreId;
  if(dept && owner){
    deptModel.create({centreId: centreId,dept: dept,owner:owner}).then(function(p){
      res.redirect('/admin/org/dept');
    });
  }else{
    res.send('未填写完整');
  }
});

// action: add office
router.post('/addOffice', function(req,res,next){
  var office = req.body.officeModal.trim();
  var owner = req.body.owerModal.trim();
  var centreId = req.session.user.centreId;
  var deptId = req.body.deptId;
  if (deptId && office && owner){
    officeModel.create({centreId: centreId, deptId: deptId, office: office, owner:owner}).then(function(p){
      res.redirect('/admin/org/office?deptId=' + deptId);
    });
  }else{
    res.send('未填写完整');
  }
});


module.exports = router;