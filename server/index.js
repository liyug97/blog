// node 后端服务器
const userApi = require('./api/userApi');
const blogApi = require('./api/blogApi');
const commentApi = require('./api/commentApi'); 
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// 后端api路由
app.use('/api/user', userApi);//使用它来注册函数
app.use('/api/blog', blogApi);
app.use('/api/comment',commentApi);
// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');