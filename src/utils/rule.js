    //字段名的验证
    var columnNames = (rule, value, callback) => {
        if (!value) {
           return callback(new Error('字段名不能为空'));
        }
        if (value) {
            setTimeout(() => {
                 var reg =  /^[a-zA-Z]\w{4,19}$/;
                if (!reg.test(value)) {
                    callback(new Error('有效的字段名为第一个必须是字母，后面可以是字母、数字、下划线，总长度为5-20！'));
                } else {
                    callback();
                }
            }, 500);
        }
    };   
   //数据长度的验证
   var lengths = (rule, value, callback) => {
    if (!value) {
      return callback(new Error('数据长度不能为空'));
    }
    setTimeout(() => {
        var reg = /^[1-9]\d*$/;
            if (!reg.test(value)) {
                callback(new Error('数据长度为大于0的正整数'));
            } else {
                callback();
            }
    }, 1000);
  };

  export { columnNames , lengths };