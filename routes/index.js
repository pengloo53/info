/**
*  router 规划
*/

module.exports = function(app){
  app.get('/', function(req, res, next){
    res.render('index',{
      title: 'Hello, welcome...'
    });
  });
  app.use('/login', require('./login'));                  // 登陆
  // app.use('/signin', require('./signin'));                // 注册
  app.use('/test', require('./test'));                    // 测试页

  app.use('/todo',require('./todo'));                     // 1. 待办事项页
  app.use('/fom',require('./fom'));                       // 2. FOM人员管理
  app.use('/project',require('./project'));               // 3. 重点项目管理
  app.use('/user', require('./users'));                   // 用户页

  // 页面路由：后台管理
  app.use('/admin', require('./pages/admin'));

  
  app.use('/u', require('./user'));               // user信息

  // 功能路由：FOM 人员管理
  app.use('/a/fom',require('./actions/fom.js'));  // action
  app.use('/d/fom',require('./datas/fom.js'));    // data

  // 功能路由：组织管理
  app.use('/a/org', require('./actions/org.js'));
  app.use('/d/org', require('./datas/org.js'));

  // 功能路由 PROJECT 重点工作管理
  // app.use('/a/project', require('./actions/project.js'));
  // app.use('/d/project', require('./datas/project.js'));

  // 功能路由：TODO 代办清单
  // app.use('/a/todo', require('./actions/todo.js'));
  // app.use('/d/todo', require('./datas/todo.js'));
}
