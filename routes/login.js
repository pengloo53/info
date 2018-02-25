var express = require('express');
var router = express.Router();

var dbGet = require('../dbController/db-index-get.js');

/* 登陆页 */
router.get('/', function(req, res, next) {
  res.render('pages/login.ejs',{
    title: '登陆页',
    page: 'login'
  });
});

// 登陆动作
router.post('/', function(req,res,next){
  var username = req.body.username; 
  var password = req.body.password;
  dbGet.validateUser(username, function(err,rows,fields){
    if(!err){
      var user = rows[0];
      if(!user){
        req.flash('error','not exist user!');
        return res.redirect('/login');
      }
      if(user.password !== password){
        req.flash('error','Password is not correct!');
        return res.redirect('/login');
      }
      req.flash('success','Login Success!');
      res.session.user = user;
      res.redirect('/');
    }else{
      next(err);
    }
  });
});

module.exports = router;