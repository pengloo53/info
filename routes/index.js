var getAes = require('../libs/util/crypto-aes.js').getAes;
var getDAes = require('../libs/util/crypto-aes.js').getDAes;

module.exports = function(app){
  app.get('/', function(req, res, next){
    res.render('index',{
      title: 'Hello, express...'
    });
  });

  app.post('/test', function(req,res,next){
    var value = req.body.value;
    var code = req.body.code.toString();
    console.log('----------------------: '+code);
    var value2 = getDAes(code);
    res.send(value2);
  });
  app.use('/login', require('./login'));    // 登陆
  app.use('/signin', require('./signin'));  // 注册
  app.use('/u',require('./users'));         // 用户页
  app.use('/todo',require('./todo'));       // 1. 待办事项页
  app.use('/fom',require('./fom'));         // 2. FOM人员管理
  app.use('/project',require('./project')); // 3. 重点项目管理
  app.use('/user', require('./users'));     // 用户页
  app.use('/admin', require('./admin'));    // 管理员页
}
