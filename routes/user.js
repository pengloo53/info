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
  var username = req.body.username.trim();
  var newPasswd = req.body.newPasswd.trim();
  var rePasswd = req.body.rePasswd.trim();
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

// action: add User admin
router.post('/add', function(req,res,next){
  var username = req.body.username.trim();
  var role = req.body.role;
  var deptId = req.body.deptId;
  if(username){
    userModel.create({username: username,role:role,deptId:deptId}).then(function(p){
      res.redirect('/admin/user');
    });
  }else{
    res.send('填写完整再提交');
  }
});

// ajax: jquery-tabledit update user
router.post('/ajax/jqueryTabledit', function(req,res,next){
  var action = req.body.action;
  var username = req.body.username;
  var userid = req.body.userid || '';
  var email = req.body.email || '';
  var role = req.body.role;
  var id = req.body.id;
  if(action === 'delete'){
    userModel.destroy({
      where: {id: id}
    }).then(function(p){
      res.send(JSON.stringify({message: 'delete success'}));  // jquery tabledit 要求返回json
    });
  }else if(action === 'edit'){
    userModel.update({username: username, email:email, userid: userid},{
      where: {id: id}
    }).then(function(p){
      res.send(JSON.stringify({message: 'edit success'}));  // jquery tabledit 要求返回json
    });
  }else if(action === 'restore'){
    userModel.restore({
      where : {id: id}
    }).then(function(p){
      res.send(JSON.stringify({message: 'cancel success'}));
    });
  }
});

module.exports = router;