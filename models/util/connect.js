var mysql = require('mysql');
var mysql_config = require('config-lite')(__dirname).mysql;

var pool = mysql.createPool(mysql_config);

// 执行SQL语句
function querySQL(sql,callback){
  pool.getConnection(function(err,conn){
    if(err){
      callback(err,null,null);
    }else{
      conn.query(sql,function(err,rows,fields){
        // 释放连接
        conn.release();
        // 回调返回
        callback(err,rows,fields);
      });
    }
  });
};

module.exports = querySQL;