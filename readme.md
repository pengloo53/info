### 问题记录
1. jquery：Select的Change事件，不起作用，不能使用click事件
2. sequelize update语句，字段使用变量问题

    ```javascript
    todolist.update({
      name: value   // 这里的name，想通过变量附值
    },{
      where: {
        'id': id
      }
    }).then(function(p){
      console.log('update.' + JSON.stringify(p));
      res.send('success');
    });
    ```