var centreModel = require('../../models/fom/centre.js');
var deptModel = require('../../models/fom/dept.js');
var officeModel = require('../../models/fom/office.js');

module.exports = {
  // 获取中心List
  getCentreList: function(req,res,next){
    centreModel.findAll().then(function(p){
      res.locals.centreList = p;
      next();
    });
  },
  getDeptList: function(req,res,next){
    var centreId = req.session.user.centreId;
    deptModel.findAll({where: {centreId : centreId}}).then(function(p){
      res.locals.deptList = p;
      next();
    });
  },
	// 获取科室列表
  getOfficeList: function(req,res,next){
    var deptId = req.session.user.deptId;
    officeModel.findAll({where: {deptId: deptId}}).then(function(p){
      res.locals.officeList = p;
      next();
    });
  },
  // 获取中心信息
  getCentreInfo: function(req,res,next){
    var centreId = req.session.user.centreId;
    centreModel.findOne({where:{id: centreId}}).then(function(p){
      res.locals.centreInfo = p;
      next();
    });
  },
  // 获取部门信息
  getDeptInfo: function(req,res,next){
    var deptId = req.session.user.deptId;
    deptModel.findOne({where: {id: deptId}}).then(function(p){
      res.locals.deptInfo = p;
      next();
    });
  },
  // // 获取科室信息
  // getOfficeInfo: function(req,res,next){
  //   var officeId = req.session.user.officeId;
  // }
}