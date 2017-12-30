module.exports = function(app){
  app.get('/', function(req, res, next){
    res.render('index',{
      title: 'Hello, express...'
    });
  });
  app.use('/login', require('./login'));   // 登陆
  app.use('/logout',require('./logout'));  // 登出
  app.use('/signin', require('./signin'));  // 注册
  app.use('/u',require('./users'));  // 用户页
  app.use('/todo',require('./todo'));    // 待办事项页
  app.use('/ajax',require('./ajax'));   // 异步请求
}
