<template>
  <div class="img">
    <div class="login-wrap">
      <h1>找回密码界面</h1>
      <p>请输入相关信息：</p>
      <el-form :model="ruleForm" :rules="rules" ref="ruleRef">
        <el-form-item prop="username">
          <el-input
            type="text"
            placeholder="用户名"
            prefix-icon="iconfont iconyonghu"
            v-model="ruleForm.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="problem">
          <el-input
            placeholder="请输入密保问题"
            prefix-icon="iconfont iconmima"
            v-model="ruleForm.problem"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="answer">
          <el-input
            type="password"
            placeholder="请输入密保答案"
            prefix-icon="iconfont iconmima"
            v-model="ruleForm.answer"
          >
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" class="btn" @click="submit">提交</el-button
          ><br />
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
        username: "",
        problem: "",
        answer: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        problem: [
          { required: true, message: "请输入密保问题", trigger: "blur" }
        ],
        answer: [{ required: true, message: "请输入密保答案", trigger: "blur" }]
      }
    };
  },
  methods: {
    submit() {
      if (
        this.ruleForm.username == "" ||
        this.ruleForm.problem == "" ||
        this.ruleForm.answer == ""
      ) {
        alert("请输入用户名或密保问题或密保答案");
      } else {
        let data = {
          username: this.ruleForm.username,
          problem: this.ruleForm.problem,
          answer: this.ruleForm.answer
        };
        this.$refs.ruleRef.validate(valid => {
          if (!valid) return;
          axios.post("/api/user/contrastUser", data).then(res => {
            console.log(res);
            if (res.data == -1) {
              this.$message({
                message: "用户名输入不正确",
                type: "success",
                offset: 50
              })
            } else if (res.data == 0) {
              this.$message({
                message: "密保问题输入不正确",
                type: "success",
                offset: 50
              })
            } else if (res.data == -2) {
              this.$message({
                message: "密保答案输入不正确",
                type: "success",
                offset: 50
              })
            }else{
              this.$message({
                message: "信息输入正确",
                type: "success",
                offset: 50,
                duration: 1000
              })
              localStorage.setItem("forget_username", this.ruleForm.username); 
              this.ruleForm.username = "";
              this.ruleForm.problem = "";
              this.ruleForm.answer = "";
              /*成功之后再跳回登录页*/
              setTimeout(
                function() {
                  this.$router.push("/update");
                }.bind(this),
                1000
              );
            }
          });
        });
      }
    },
    goback() {
      this.$router.push({ path: "/" });
    }
  }
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
.btn1 {
  margin-top: 10px;
}
</style>
