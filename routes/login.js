var express = require('express');
var router = express.Router();

/* 登陆页 */
router.get('/', function(req, res, next) {
  res.render('pages/login.ejs',{
    title: '登陆页'
  });
});

// 登陆动作
router.post('/', function(req,res,next){
    
});

module.exports = router;