module.exports = {
  checkLogin: function (req, res, next) {
    if (!req.session.user) {
      req.flash('error', '未登录');
      return res.redirect('/login');
    }
    next();
  },

  checkNotLogin: function (req, res, next) {
    if (req.session.user) {
      req.flash('error', '已登录');
      return res.redirect('/project');
    }
    next();
  },

  isCentreManager: function(req, res, next){
    if(req.session.user && req.session.user.role == 'B'){
      next();
    }else{
      return res.redirect('/login');
    }
  }
};