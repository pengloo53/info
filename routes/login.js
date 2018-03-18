var express = require('express');
var router = express.Router();

var userModel = require('../models/user/user.js');

var dbGet = require('../dbController/db-index-get.js');

var checkLogin = require('../libs/middle/checkLogin.js').checkLogin;

/* 登陆页 */
router.get('/', function(req, res, next) {
  res.render('pages/login.ejs',{
    title: '登陆页',
    page: 'login'
  });
});

// 登陆动作
router.post('/', function(req,res,next){
  var userid = req.body.userid; 
  var password = req.body.password;
  userModel.findOne({where: {userid: userid}}).then(function(user){
    // console.log(user);
    if(!user){
      req.flash('error','not exist user!');
      return res.redirect('/login');
    }
    if(user.password !== password){
      req.flash('error','Password is not correct!');
      return res.redirect('/login');
    }
    req.flash('success','Login Success!');
    req.session.user = user;
    res.redirect('/user/fom');
  });
});

// 登出动作
router.get('/out', checkLogin, function(req,res,next){
  // 清空 session 中用户信息
  req.session.user = null;
  req.flash('success', '登出成功');
  // 登出成功后跳转到主页
  res.redirect('/login');
});

module.exports = router;