var express = require('express');
var router = express.Router();

router.get('/bootstrapTable/todo', function(req, res, next) {
    var result = [];
    var testData = {
        title: 'TEST1',
        content: 'Content',
        result: 'Your want ',
        priority: '重要紧急'
    };
    result.push(testData);
    res.send(result);
});

module.exports = router;