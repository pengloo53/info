module.exports = {
    getIp : function(req){
        var remoteIp = req.ip.match(/\d+\.\d+\.\d+\.\d+/);
        if (remoteIp) {
            return remoteIp;
        } else {
            return '127.0.0.1';
        }
    }
}