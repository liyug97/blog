<template>
  <div class="editblog">
    <h2 algin="center">编辑博客</h2>
    <el-form
      :model="blog"
      label-width="80px"
      v-if="!submited"
    >
      <el-form-item label="博客标题">
        <el-input v-model="blog.title"></el-input>
      </el-form-item>
      <el-form-item label="博客内容">
        <el-input type="textarea" v-model="blog.content" :rows="5"></el-input>
      </el-form-item>
      <el-form-item label="博客类型">
        <el-input v-model="blog.type"></el-input>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="blog.author"></el-input>
      </el-form-item>
      <el-button type="primary" v-on:click.prevent="updateBlog(blog.id)"
        >编辑博客</el-button
      >
    </el-form>
    <div v-if="submited">
      <h3>你的博客编辑成功!</h3>
    </div>
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
  name: "editBlog",
  data() {
    return {
      blog: {
        title: "",
        content: "",
        type: "",
        author: ""
      },
      submited: false
    };
  },
  created() {
    this.getBlog();
  },
  methods: {
    getBlog: function() {
      axios
        .post("/api/blog/blogDetail", { id: this.$route.params.id })
        .then(ret => {
          const res = ret.data;
          if (res.code === 0) {
            this.blog = res.data[0];
          } else {
            MessageBox.alert(res.msg);
          }
        });
    },
    updateBlog(id) {
      axios
        .post("/api/blog/updateBlog", {
          id: id,
          title: this.blog.title,
          content: this.blog.content,
          type: this.blog.type,
          author: this.blog.author
        })
        .then(res => {
          this.$message({
              message: "修改成功",
              type: "success",
              offset: 20,
              duration:1000
            });
          this.$router.push({ path: "/home" });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.editblog * {
  box-sizing: border-box;
}
.editblog {
  max-width: 600px;
  margin: 10px auto;
  padding: 2px;
}
.btn {
  margin-left: 80px;
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
