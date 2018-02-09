var express = require('express');
var router = express.Router();

var dbget = require('../dbController/db-index-get.js');

/* 登陆页 */
router.get('/', function(req, res, next) {
  res.render('pages/login.ejs',{
    title: '登陆页'
  });
});

// 登陆动作
router.post('/', function(req,res,next){
  var username = req.body.username; 
  var password = req.body.password;
  dbget.validateUser(username,password,function(err,rows,fields){
    if(!rows || rows.length == 0){
      res.flash('error','未找到用户');
      res.redirect('/login');
    }else if(password != rows[0].password){
      res.flash('error','用户密码不正确');
      res.redirect('/login');
    }
  });
});

module.exports = router;