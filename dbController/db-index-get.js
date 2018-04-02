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

exports.findStaffByDeptId = findStaffByDeptId;
exports.findStaffByCentreId = findStaffByCentreId;
exports.getLog = getLog;