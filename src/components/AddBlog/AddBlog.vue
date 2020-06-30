<template>
  <div class="addblog">
    <h2 algin="center">添加博客</h2>
    <el-radio-group v-model="labelPosition" size="small">
      <el-radio-button label="left">左对齐</el-radio-button>
      <el-radio-button label="right">右对齐</el-radio-button>
      <el-radio-button label="top">顶部对齐</el-radio-button>
    </el-radio-group>
    <div style="margin: 20px;"></div>
    <el-form
      :label-position="labelPosition"
      :model="blog"
      :rules="rules"
      ref="formRef"
      label-width="80px"
    >
      <el-form-item label="博客标题" prop="title">
        <el-input v-model="blog.title"></el-input>
      </el-form-item>
      <el-form-item label="博客内容" prop="content">
        <el-input type="textarea" v-model="blog.content" :rows="5"></el-input>
      </el-form-item>
      <el-form-item label="博客类型" prop="type">
        <el-input v-model="blog.type"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="blog.author"></el-input>
      </el-form-item>
      <el-button type="primary" v-on:click="post">添加博客</el-button>
    </el-form>
    <div id="preview">
      <h3 align="center">博客总览</h3>
      <p>博客标题:{{ blog.title }}</p>
      <p>博客内容:</p>
      <p>{{ blog.content }}</p>
      <p>博客类型:{{ blog.type }}</p>
      <p>作者:{{ blog.author }}</p>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "AddBlog",
  data() {
    return {
      labelPosition: "top",
      blog: {
        title: "",
        content: "",
        type: "",
        author: ""
      },
      rules: {
        title: [{ required: true, message: "请输入博客标题", trigger: "blur" }],
        content: [
          { required: true, message: "请选择博客内容", trigger: "blur" }
        ],
        type: [{ required: true, message: "请输入博客类型", trigger: "blur" }],
        author: [
          {
            required: true,
            message: "请输入作者",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    post: function() {
      if (
        (this.blog.title =="" || this.blog.content == "" || this.blog.type ==
          "" || this.blog.author=='')
      ) {
        alert("请输入相应的内容");
      }
      this.$refs.formRef.validate(valid => {
        if (!valid) return;
        axios
          .post("/api/blog/addBlog", {
            title: this.blog.title,
            content: this.blog.content,
            type: this.blog.type,
            author: this.blog.author
          })
          .then(res => {
            this.$message({
              message: "发表博客成功",
              type: "success",
              offset: 150,
              duration: 1000
            });
            this.blog = {};
            console.log(res.data);
          })
          .catch(function(error) {
            console.log(error);
          });
      });
    }
  }
};
</script>
<style scoped>
.addblog * {
  box-sizing: border-box;
}
.addblog {
  max-width: 600px;
  margin: 30px auto;
  padding: 2px;
}
#preview {
  padding: 10px 20px;
  border: 1px dotted #ccc;
  margin: 30px 0;
}
h3 {
  margin-top: 10px;
}
</style>
