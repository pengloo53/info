var logModel = require('../../models/log.js');
var getIp = require('./myUtil.js').getIp;

module.exports = {
  addLog: function(req, page, action, name, oldData, newData){
    var username = req.session.user.username;
    var ip = getIp(req);
    logModel.create({page: page, username: username,action: action, name: name, oldData: oldData, newData: newData,ip:ip}).then(function(p){
      console.log('created.' + JSON.stringify(p));
    }).catch(function(err){
      console.log('failed: ' + err);
    });
  }
}