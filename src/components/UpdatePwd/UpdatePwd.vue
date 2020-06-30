<template>
  <div class="img">
    <div class="login-wrap">
      <h1>修改密码界面</h1>
      <el-form :model="ruleForm" :rules="rules" ref="ruleRef">
        <el-form-item prop="newPwd">
          <el-input
            placeholder="新密码"
            prefix-icon="iconfont iconmima"
            v-model="ruleForm.newPwd"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="newPwd">
          <el-input
            placeholder="重复新密码"
            prefix-icon="iconfont iconmima"
            v-model="ruleForm.againPwd"
          >
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" class="btn" @click="update">修改</el-button><br>
          <el-button type="info" class="btn1" @click="goback">返回</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      ruleForm: {
        newPwd: "",
        againPwd: ""
      },
      rules: {
        newPwd: [{ required: true, message: "请输入新密码", trigger: "blur" },
        { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }],
        againPwd: [
          { required: true, message: "再次输入新密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    update() {
      let forget_username = localStorage.getItem("forget_username");
      if(this.ruleForm.newPwd!=this.ruleForm.againPwd){
        alert('两次输入的密码不一样,请重新输入')
        this.ruleForm={}
      }
      this.$refs.ruleRef.validate(valid=>{
        if(!valid) return;
        axios
        .post("/api/user/updatePassword", {
          password: this.ruleForm.newPwd,
          username: forget_username
        })
        .then(res => {
          this.$message({
                message: "修改密码成功",
                type: "success",
                offset: 50,
                duration: 1000
              })
          this.$router.push({ path: "/" });
        })
        .catch(function(error) {
          console.log(error);
        });
      })
    },
    goback(){
    this.$router.push({ path: "/forget" });
  }
  },
  
};
</script>
<style scoped>
.login-wrap {
  width: 400px;
  margin: 0 auto;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
}
.img {
  background: url("../../assets/img.jpg");
  background-size: 100% 100%;
  height: 100%;
  width: 100%;
  position: fixed;
  animation: frams 7s ease-in infinite;
}
@keyframes frams {
  0% {
    background: url("../../assets/img.jpg");
    background-size: 100% 100%;
    height: 100%;
    width: 100%;
  }
  33% {
    background: url("../../assets/img8.jpg");
    background-size: 100% 100%;
    height: 100%;
    width: 100%;
  }
  66% {
    background: url("../../assets/img9.jpg");
    background-size: 100% 100%;
    height: 100%;
    width: 100%;
  }
  100% {
    background: url("../../assets/img10.jpg");
    background-size: 100% 100%;
    height: 100%;
    width: 100%;
  }
}
h1 {
  font-family: Arial, Helvetica, sans-serif;
  color: rgb(90, 78, 78);
  text-align: center;
  margin-top: 100px;
  margin-bottom: 50px;
}
.btn1{
  margin-top: 10px;
}
</style>
