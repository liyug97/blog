<template>
  <div class="img">
    <div class="login-wrap" v-show="showLogin">
      <h1>登录界面</h1>
      <p v-show="showTishi">{{ tishi }}</p>
      <el-form :model="ruleForm" :rules="rules" ref="ruleRef">
        <el-form-item prop="username">
          <el-input
            type="text"
            placeholder="用户名"
            prefix-icon="iconfont iconyonghu"
            v-model="ruleForm.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="密码"
            prefix-icon="iconfont iconmima"
            v-model="ruleForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="sidentify">
          <el-input
            v-model="ruleForm.sidentify"
            class="validate-code"
            placeholder="验证码"
          ></el-input>
          <div class="code" @click="refreshCode">
            <s-identify :identifyCode="identifyCode"></s-identify>
          </div>
        </el-form-item>
      </el-form>
      <div class="login-btn">
        <el-button type="primary" @click="login">登录</el-button><br />
        <el-button type="info" class="btn" @click="resetLoginForm"
          >重置</el-button
        ><br />
        <el-button type="warning" plain class="btn1" @click="forgetPassword"
          >找回密码</el-button
        >
        <span v-on:click="ToRegister">没有账号？马上注册</span>
      </div>
    </div>

    <div class="register-wrap" v-show="showRegister">
      <h1>注册界面</h1>
      <p v-show="showTishi">{{ tishi }}</p>
      <el-form :model="registerForm" :rules="formRules" ref="registerRef">
        <el-form-item prop="newUsername">
          <el-input
            type="text"
            placeholder="请输入用户名"
            prefix-icon="iconfont iconyonghu"
            v-model="registerForm.newUsername"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="newPassword">
          <el-input
            type="password"
            placeholder="请输入密码"
            prefix-icon="iconfont iconmima"
            v-model="registerForm.newPassword"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="problem">
          <el-input
            placeholder="请输入密保问题"
            prefix-icon="iconfont iconmima"
            v-model="registerForm.problem"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="answer">
          <el-input
            type="password"
            placeholder="请输入密保答案"
            prefix-icon="iconfont iconmima"
            v-model="registerForm.answer"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div class="login-btn">
        <el-button type="primary" class="btn" @click="register">注册</el-button>
        <el-button type="info" class="btn" @click="resetRegisterForm"
          >重置</el-button
        >
        <span v-on:click="ToLogin">已有账号？马上登录</span>
      </div>
    </div>
  </div>
</template>
<script>
import Identify from "../page/Identify.vue";
import { setCookie, getCookie } from "../../assets/js/cookie.js";
import axios from "axios";
export default {
  components: {
    "s-identify": Identify
  },
  data() {
    const sidentify = (rule, value, callback) => {
      let newVal = value;
      let identifyStr = this.identifyCode.toLowerCase();
      if (newVal === "") {
        callback(new Error("请输入验证码"));
      } else if (newVal !== identifyStr) {
        callback(new Error("验证码输入不正确"));
      } else {
        callback();
      }
    };
    return {
      identifyCodes: "1234567890ABCDEFGHIGKMNOPQRSTUVWXYZ",
      identifyCode: "", //验证码
      showLogin: true,
      showRegister: false,
      showTishi: false,
      tishi: "",
      ruleForm: {
        username: "",
        password: "",
        sidentify: ""
      },
      registerForm: {
        newUsername: "",
        newPassword: "",
        problem: "",
        answer: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ],
        sidentify: [{ validator: sidentify, trigger: "blur" }]
      },
      formRules: {
        newUsername: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ],
        problem: [
          { required: true, message: "请输入密保问题", trigger: "blur" }
        ],
        answer: [{ required: true, message: "请输入密保答案", trigger: "blur" }]
      }
    };
  },
  mounted() {
    /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
    if (getCookie("username")) {
      this.$router.push("/home");
    }
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },

  methods: {
    forgetPassword() {
      this.$router.push("/forget");
    },
    resetLoginForm() {
      this.$refs.ruleRef.resetFields();
      this.showTishi = false;
      this.refreshCode();
    },
    resetRegisterForm() {
      this.$refs.registerRef.resetFields();
      this.showTishi = false;
    },
    ToRegister() {
      this.showRegister = true;
      this.showLogin = false;
    },
    ToLogin() {
      this.showRegister = false;
      this.showLogin = true;
    },
    register() {
      if (
        this.registerForm.newUsername == "" ||
        this.registerForm.newPassword == "" ||
        this.registerForm.problem == "" ||
        this.registerForm.answer == ""
      ) {
        alert("内容不能为空");
      } else {
        let data = {
          username: this.registerForm.newUsername,
          password: this.registerForm.newPassword,
          problem: this.registerForm.problem,
          answer: this.registerForm.answer
        };
        axios.post("/api/user/addUser", data).then(res => {
          console.log(res);
          if (res.data == "-1") {
            this.tishi = "该用户名已被注册";
            this.showTishi = true;
          } else {
            this.tishi = "注册成功";
            this.showTishi = true;
            this.registerForm.newUsername = "";
            this.registerForm.newPassword = "";
            this.registerForm.problem = "";
            this.registerForm.answer = "";
            /*注册成功之后再跳回登录页*/
            setTimeout(
              function() {
                this.showRegister = false;
                this.showLogin = true;
                this.showTishi = false;
              }.bind(this),
              1000
            );
          }
        });
      }
    },
    login() {
      if (this.ruleForm.username == "" || this.ruleForm.password == "") {
        alert("请输入用户名或密码");
      } else {
        let data = {
          username: this.ruleForm.username,
          password: this.ruleForm.password,
          sidentify: this.ruleForm.sidentify
        };
        this.$refs.ruleRef.validate(valid => {
          if (!valid) return;
          axios.post("/api/user/selectUser", data).then(res => {
            console.log(res);
            if (res.data == -1) {
              this.tishi = "该用户不存在";
              this.showTishi = true;
            } else if (res.data == 0) {
              this.tishi = "密码输入错误";
              this.showTishi = true;
            } else {
              this.tishi = "登录成功";
              this.showTishi = true;
              setCookie("username", this.ruleForm.username, 1000 * 60);
              setTimeout(
                function() {
                  this.$router.push("/home");
                }.bind(this),
                1000
              );
            }
          });
        });
      }
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
      console.log(this.identifyCode);
    }
  }
};
</script>
<style scoped>
.login-wrap {
  width: 400px;
  margin: 0 auto;
}
.img {
  background: url("../../assets/img.jpg");
  background-size: 100% 100%;
  height: 100%;
  width: 100%;
  position: fixed;
  -ms-animation: frams 7s ease-in infinite;
  animation: frams 7s ease-in infinite;
}
@-ms-keyframes frams {
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
input {
  display: block;
  width: 250px;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
  margin-bottom: 10px;
  outline: none;
  border: 1px solid #888;
  padding: 10px;
  box-sizing: border-box;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
}
.btn {
  margin-top: 10px;
}
.btn1 {
  margin-top: 10px;
}
p {
  font-size: 16px;
  font-weight: bold;
  color: rgb(12, 97, 146);
}
span {
  text-align: center;
  cursor: pointer;
  display: inline-block;
  font-size: 16px;
  margin-top: 20px;
  color: rgb(39, 37, 37);
}

span:hover {
  color: #b10a18;
}
.register-wrap {
  width: 400px;
  margin: 0 auto;
}
.code {
  width: 112px;
  height: 35px;
  border: 1px solid #ccc;
  float: right;
  border-radius: 2px;
}
.validate-code {
  width: 136px;
  float: left;
}
</style>
