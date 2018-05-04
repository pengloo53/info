/**
*   用户信息变更等操作
*/

var express = require('express');
var router = express.Router();
// 用户表模型
var userModel = require('../models/user/user.js');
// 工具中间件：添加Log
var addLog = require('../libs/util/log.js').addLog;

// action: changePassword admin
router.post('/changePassword', function(req,res,next){
  var username = req.body.username;
  var newPasswd = req.body.newPasswd;
  var rePasswd = req.body.rePasswd;
  if(!newPasswd || !rePasswd || newPasswd == '' || rePasswd == ''){
    return res.send('输入完整再提交');
  }
  if(newPasswd !== rePasswd){
    return res.send('两次密码输入不同');
  }
  userModel.update(
    {password: rePasswd},
    {where: {username: username}},
    {fields: ['password']}
  ).then(function(p){
    addLog(req, 'user', '修改密码', '','','');
    req.session.user = null;
    req.flash('success','更新密码成功，请重新登陆');
    res.redirect('/login');
  });
});


module.exports = router;