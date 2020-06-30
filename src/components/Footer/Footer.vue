<template>
  <div class="contact">
  <div class="header">
    <img src="../../assets/249.jpg" alt="图片" />
  </div>
  <div class="main">
    <h1><i class="el-icon-s-custom"></i>&nbsp;联系我们</h1>
    <p>如有任何问题请联系我们，我们7*24小时竭诚为您服务</p>
  </div>
  <div class="footer">
    <span class="scroll"></span>
    <el-divider></el-divider>
    <span>法律声明</span>
    <el-divider direction="vertical"></el-divider>
    <span>友情链接</span>
    <el-divider direction="vertical"></el-divider>
    <span @click="drawer = true">联系我</span>
    <br />
    <br />
    <span class="copyright">版权所有 Guoliyu</span>
    <el-drawer
      title="联系我"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
    >
      <p class="info">
        <i class="el-icon-phone"></i>电话：18822299999<br />
        <i class="el-icon-message"></i>邮箱：18822299999@163.com<br />
      </p>
    </el-drawer>
  </div>
</div>
</template>
<script>
  export default {
    name: "Footer",
    data() {
      return {
        drawer: false,
        direction: "btt"
      };
    },
    methods: {
      handleClose(done) {
        done();
      }
    }
  };
  </script>
  
<style>
.el-divider {
  background-color: rgb(84, 92, 100);
}
</style>
<style scoped>
.header{
    width: 100%;
    height: 250px;
}
.header img{
    width: 100%;
    margin-top: -20px;
    height: 230px;
}
.main{
    margin-top: -20px;
    width: 100%;
}
.main h1{
    font-family: sans-serif;
    text-align: center;
}
.main p{
    height: 40px;
    text-align: center;
    margin-top: 20px;
}
.footer {
  height: 100px;
  text-align: center;
  font-size: 16px;
  padding: 0px 100px;
  position: relative;
}
.footer {
  cursor: pointer;
}
.copyright {
  font-size: 12px;
}
.info {
  margin-top: 15px;
  font-size: 14px;
  color: #72767b;
  line-height: 25px;
}
.footer .scroll {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 5px;
  border: 1px solid #448aff;
  background-color: rgba(68, 138, 255, 0.2);
  position: absolute;
  left: 5%;
  top: -25px;
  z-index: 10;
  animation: scrollA infinite 8s linear alternate;
}
@keyframes scrollA {
  0% {
    left: 5%;
    transform: rotate(180deg);
  }
  10% {
    left: 5%;
    transform: rotate(270deg);
  }
  20% {
    left: 5%;
    transform: rotate(450deg);
  }
  25% {
    left: 10%;
    transform: rotate(540deg);
  }
  30% {
    left: 20%;
    transform: rotate(720deg);
  }
  35% {
    left: 30%;
    transform: rotate(900deg);
  }
  40% {
    left: 40%;
    transform: rotate(1080deg);
  }
  45% {
    left: 50%;
    transform: rotate(1260deg);
  }
  50% {
    left: 60%;
    transform: rotate(1440deg);
  }
  55% {
    left: 70%;
    transform: rotate(1620deg);
  }
  60% {
    left: 80%;
    transform: rotate(1800deg);
  }
  80% {
    left: 90%;
    transform: rotate(2610deg);
  }
  90% {
    left: 90%;
    transform: rotate(2340deg);
  }
  100% {
    left: 90%;
    transform: rotate(2520deg);
  }
}
</style>
