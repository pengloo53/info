var querySQL = require('../models/util/connect.js');

// 获取中心所有员工，根据centreId
function findStaffByCentreId(centreId, callback){
  var sql = 'select * from fom_staff s left join fom_centre c on c.id = s.centreId left join fom_dept d on s.deptId= d.id left join fom_office o on s.officeId = o.id where s.centreId=' + centreId + ' and s.deletedAt is null order by s.centreId ,s.deptId, s.officeId';
  querySQL(sql, function(err,rows,fields){
    callback(err,rows,fields);
  });
}

// 获取部门员工，根据deptId
function findStaffByDeptId(deptId, callback){
  var sql = 'select * from fom_staff s left join fom_dept d on s.deptId= d.id left join fom_office o on s.officeId = o.id where s.deptId=' + deptId + ' and s.deletedAt is null order by s.deptId,s.officeId';
  querySQL(sql, function(err,rows,fields){
    callback(err,rows,fields);
  });
}

function getLog(username,page,callback){
	var sql = 'select * from log where page = "' + page + '" and username="'+ username + '" order by id desc limit 13';
	querySQL(sql, function(err,rows,fields){
		callback(err,rows,fields);
	});
}

// 用于admin index图表
function getGroupFromCentre(centreId, group, callback){
  var sql = 'select ' + group +' name, count(*) value from fom_staff where centreId =' + centreId + ' and deletedAt is null group by ' + group;
  querySQL(sql, function(err,rows,fields){
    callback(err,rows,fields);
  });
}

// admin index 获取中心sum人数
function getTotalByCentreId(centreId , callback){
  var sql = 'select count(*) total from fom_staff where centreId = ' + centreId + ' and deletedAt is null'
  querySQL(sql, function(err,rows,fields){
    callback(err,rows,fields);
  });
}

function getUserList(centreId, callback){
  var sql = 'select u.id id,u.username username,u.userid userid,u.email email,u.role role, c.centre centre,d.dept dept from user u left join fom_centre c on c.id = u.centreId left join fom_dept d on d.id = u.deptId where u.centreId = ' + centreId + ' and u.deletedAt is null order by u.deptId';
  querySQL(sql, function(err, rows,fields){
    callback(err,rows,fields);
  });
}

exports.findStaffByDeptId = findStaffByDeptId;
exports.findStaffByCentreId = findStaffByCentreId;
exports.getLog = getLog;
exports.getGroupFromCentre = getGroupFromCentre;
exports.getTotalByCentreId = getTotalByCentreId;
exports.getUserList = getUserList;

// getUserList(1, function(err,rows,fields){
//   console.log(rows);
// });