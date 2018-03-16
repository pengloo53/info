var querySQL = require('../models/util/connect.js');

// 获取用户主数据
function getUser(id, callback){
  var sql = 'select * from user u left join u_dept d where id = ' + id ; 
  querySQL(sql, function(err,rows,fields){
    callback(err,rows,fields);
  });
}

// 获取中心所有员工
function findStaffByCentre(centre,callback){
  var sql = 'select * from staff s left join u_dept d where s.deptId= d.id and d.centre="' + centre + '"';
  querySQL(sql, function(err,rows,fields){
    callback(err,rows,fields);
  });
}

// 获取中心所有员工，根据centreId
function findStaffByCentreId(centreId, callback){
  var sql = 'select * from fom_staff s left join fom_centre c on c.id = s.centreId left join fom_dept d on s.deptId= d.id left join fom_office o on s.officeId = o.id where s.centreId=' + centreId + ' order by s.centreId ,s.deptId, s.officeId';
  querySQL(sql, function(err,rows,fields){
    callback(err,rows,fields);
  });
}

// 获取部门员工，根据deptId
function findStaffByDeptId(deptId, callback){
  var sql = 'select * from fom_staff s left join fom_dept d on s.deptId= d.id left join fom_office o on s.officeId = o.id where s.deptId=' + deptId + ' order by s.deptId,s.officeId';
  querySQL(sql, function(err,rows,fields){
    callback(err,rows,fields);
  });
}

// findStaffByDeptId(1, function(err,rows,fields){
//   console.log(rows);
// })

exports.getUser = getUser;
exports.findStaffByDeptId = findStaffByDeptId;
exports.findStaffByCentre = findStaffByCentre;
exports.findStaffByCentreId = findStaffByCentreId;