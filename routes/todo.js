var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.render('pages/todo.ejs',{
    title: '任务清单',
  });
});

module.exports = router;