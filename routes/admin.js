var express = require('express');
var router = express.Router();

// 控制权限
router.use(function(req,res,next){
	next();
});


// page: index
router.get('/', function(req,res,next){
	res.render('admin/index.ejs',{

	});
});

module.exports = router;