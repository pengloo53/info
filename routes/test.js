var express = require('express');
var router = express.Router();

var getAes = require('../libs/util/crypto-aes.js').getAes;
var getDAes = require('../libs/util/crypto-aes.js').getDAes;

// page: index
router.get('/', function(req,res,next){
  res.render('test', {
    title: 'test page'
  });
});

router.post('/', function(req,res,next){
  var value = req.body.value;
  var code = req.body.code.toString();
  console.log('----------------------: '+ code);
  var value2 = getDAes(code);
  res.send(value2);
});

router.get('/url',function(req,res,next){
	var userid = req.query.userid;
	console.log('+++++++++++++++++++++:' +  userid);
	res.send('后台得到的参数：' + userid);
});

module.exports = router;