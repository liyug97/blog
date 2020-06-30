var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');
// 连接数据库
var conn = mysql.createConnection(models.mysql);//获取数据库连接，返回一个conn对象
conn.connect();//判断连接是否成功
//向前台返回JSON方法的简单封装
var jsonWrite = function(res, ret) {
if(typeof ret === 'undefined') {
res.json({
code: '1',
msg: '操作失败'
});
} else {
res.json(ret);
}
};
// 增加用户接口
router.post('/addUser', (req, res) => {
    var sql_name = $sql.user.select_name
    var sql = $sql.user.add;
    var params = req.body;
    console.log(params);
    conn.query(sql_name,params.username,function(err,result) {
        if(err) {
            console.log(err)
        }
        if(result[0]===undefined) {
            conn.query(sql,[params.username,params.password,params.problem,params.answer], function(err, result) {
                if(err) {
                    console.log(err)
                }
                if(result) {
                    jsonWrite(res, result)
                }
            })
        }else {
            res.send('-1')    //当前注册username与数据库重复时，data返回-1
        }
    })
    
});

//查找用户接口
router.post('/selectUser', (req,res) => {
    var sql_name = $sql.user.select_name;
    var sql_password = $sql.user.select;
    var params = req.body;
    console.log(params);
    conn.query(sql_name,params.username,function(err, result) {
        if(err) {
            console.log(err)
        }
        if(result[0]===undefined) {
            res.send('-1')   
        }else {
            conn.query(sql_password,[params.username,params.password], function(err, result) {
                if(err) {
                    console.log(err)
                }
                if(result[0]===undefined) {
                    res.send('0')   
                }else {
                    jsonWrite(res, result);
                }
            })
        }
    })
});
//找回密码对比数据库里
router.post('/contrastUser', (req, res) => {
    var sql_name = $sql.user.select_name;
    var sql_problem = $sql.user.select_problem;
    var sql_answer = $sql.user.select_answer;
    var params = req.body;
    conn.query(sql_name,params.username,function(err, result) {
        if(err) {
            console.log(err)
        }
        if(result[0]===undefined) {
            res.send('-1')   
        }else {
            conn.query(sql_problem,params.problem, function(err, result) {
                if(err) {
                    console.log(err)
                }
                if(result[0]===undefined) {
                    res.send('0')   
                }else{
                    conn.query(sql_answer,params.answer,function(err,result){
                        if(err) {
                            console.log(err)
                        } 
                        if(result[0]===undefined) {
                            res.send('-2')    
                        } else {
                            jsonWrite(res, result);
                        }
                    })
                } 
            })
        }
    })
});
//修改密码
router.post('/updatePassword',(req,res)=>{
    var sql = $sql.user.update;
    var params = req.body;
    console.log(params);
    conn.query(
      sql,
      [params.password, params.username],
      function(err, result) {
        if (err) {
          console.log(err);
        }
        if (result) {
          jsonWrite(res, result);
        }
      }
    );
});

module.exports = router;
