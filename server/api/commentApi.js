var models = require("../db");
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
//评论接口
router.post("/setComment", (req, res) => {
    var sql = $sql.comment.add;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.author, params.content,params.blogId], function(err, result) {
      if (err) {
        console.log(err);
      }
      if (result) {
        jsonWrite(res, result);
      }
    });
  });
  //获取评论内容
  router.post("/commentList", async (req, res) => {
    var sql = $sql.comment.list;
    let totalSql = $sql.comment.total;
    var params = req.body;
    let blogId=params.blogId;
    let pageNo = params.pageNo;
    let pageSize = params.pageSize;
    let start = (pageNo - 1) * pageSize;
    let total = 0;
    let commentData = [];
    let listPromise = await getData(sql, [blogId,start, pageSize]);
    var listStr = JSON.stringify(listPromise);
    var listJson = JSON.parse(listStr);
    let totalPromise = await getData(totalSql, [blogId]);
    total = totalPromise[0].total;
    commentData = listJson;
    jsonWrite(res, { total, commentList: commentData });
  });
  //删除评论
  router.post("/deleteComment", (req, res) => {
    var sql = $sql.comment.delete;
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
  module.exports = router;
