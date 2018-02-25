var querySQL = require('../models/util/connect.js');

// 获取用户主数据
function getUser(id, callback){
  var sql = 'select * from user u left join u_dept d where id = ' + id ; 
  querySQL(sql, function(err,rows,fields){
    callback(err,rows,fields);
  });
}

// validate user
function validateUser(username,callback){
  var sql = 'select password from user where username="' + username + '"';
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

// 获取部门员工
function findStaffByDepartment(department, callback){
  var sql = 'select * from staff s left join u_dept d where s.deptId= d.id and d.department="' + department + '"';
  querySQL(sql, function(err,rows,fields){
    callback(err,rows,fields);
  });
}

validateUser('118663', function(){
  console.log('yes');
})

exports.getUser = getUser;
exports.validateUser = validateUser;
exports.findStaffByDepartment = findStaffByDepartment;
exports.findStaffByCentre = findStaffByCentre;