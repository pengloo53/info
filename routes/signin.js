var express = require('express');
var router = express.Router();

/* sign in page */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 注册动作
router.post('/',function(req,res,next){

});

module.exports = router;