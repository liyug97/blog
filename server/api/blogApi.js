var models = require("../db");//引入模块，require用来加载代码
var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var $sql = require("../sqlMap");
// 连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();
async function getData(sql, params) {
  return new Promise((resolve, reject) => {
    conn.query(sql, params, (err, result) => {
      if (err) {
        reject();
      } else {
        resolve(result);
      }
    });
  });
}
var jsonWrite = async function(res, ret) {
  if (typeof ret === "undefined") {
    res.json({
      code: "1",
      msg: "操作失败"
    });
  } else {
    res.json({
      code: 0,
      msg: "成功",
      data: ret
    });
  }
};
// 增加文章接口
router.post("/addBlog", (req, res) => {
  var sql = $sql.blog.add;
  var params = req.body;
  console.log(params);
  conn.query(
    sql,
    [params.title, params.content, params.type, params.author],
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
//获取文章
router.post("/blogList", async (req, res) => {
  var sql = $sql.blog.list;
  let totalSql = $sql.blog.total;
  var params = req.body;
  let pageNo = params.pageNo;//当前页数
  let pageSize = params.pageSize;//每页显示的记录数
  let start = (pageNo - 1) * pageSize;//翻页的记录数
  let total = 0;
  let blogData = []; 
  let listPromise = await getData(sql, [start, pageSize]);
  var listStr = JSON.stringify(listPromise);
  var listJson = JSON.parse(listStr);
  let totalPromise = await getData(totalSql, []);//totalPromise是一个数组
  total = totalPromise[0].total;
  blogData = listJson;
  jsonWrite(res, { total, blogList: blogData });
});
//文章详情
router.post("/blogDetail", async (req, res) => {
  var sql = $sql.blog.detail;
  var params = req.body;
  const data = await getData(sql, [params.id]);
  jsonWrite(res, data);
});
//删除文章
router.post("/deleteBlog", (req, res) => {
  var sql = $sql.blog.delete;
  var params = req.body;
  console.log(params);
  conn.query(sql, [params.id], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});
//更新文章
router.post("/updateBlog", (req, res) => {
  var sql = $sql.blog.update;
  var params = req.body;
  console.log(params);
  conn.query(
    sql,
    [params.title, params.content, params.type, params.author, params.id],
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
