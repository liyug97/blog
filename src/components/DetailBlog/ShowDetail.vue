<template>
  <div class="img">
    <div class="showdetail">
      <h2 align="center">博客详情内容</h2>
      <p class="title">博客标题:</p>
      <p class="p1">{{ blog.title }}</p>
      <p class="content">博客内容:</p>
      <article>{{ blog.content }}</article>
      <p class="type">博客类型:</p>
      <article>{{ blog.type }}</article>
      <p class="type">作者:</p>
      <article>{{ blog.author }}</article>
      <div style="margin-top: 10px;"></div>
      <el-button type="primary" round @click="goback" size="medium"
        >返回首页</el-button
      >
      <div class="box">
        <comment-box v-bind:id="id"></comment-box>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { MessageBox } from "element-ui";
import Comment from "../Comment/Comment";
export default {
  name: "BlogDetail",
  data() {
    return {
      blog: {},
      search: "",
      id:this.$route.params.id
    };
  },
  methods: {
    goback() {
      this.$router.push({ path: "/home" });
    },
  },
  created() {
    axios
      .post("/api/blog/blogDetail", { id: this.$route.params.id })
      .then(ret => {
        const res = ret.data;
        console.log(res)
        if (res.code === 0) {
          this.blog = res.data[0];
        } else {
          MessageBox.alert(res.msg);
        }
      });
  },
  components: {
    "comment-box": Comment
  }
};
</script>

<style type="text/css" scoped>
* {
  margin: 0;
  padding: 0;
}
.box{
  margin-top: 20px;
}
.img {
  background: url("../../assets/img.gif");
  background-size: 100% 100%;
  height: 1500px;
  width: 100%;
}
.showdetail {
  max-width: 800px;
  margin: 0 auto;
}
.single-blog {
  padding: 20px;
  margin: 20px 0;
  background: #eee;
  box-sizing: border-box;
}
h2 {
  color: rgb(84, 98, 180);
  font-size: 30px;
  padding: 17px;
}
input[type="text"] {
  width: 100%;
  box-sizing: border-box;
  padding: 8px;
}
.title {
  color: aquamarine;
  font-size: 20px;
}
.content {
  color: aquamarine;
  font-size: 20px;
  margin-top: 15px;
}
.type {
  color: aquamarine;
  font-size: 20px;
  margin-top: 15px;
}
.p1 {
  color: #eee;
  margin-top: 15px;
  padding: 12px;
}
article {
  color: #eee;
  margin-top: 15px;
  padding: 12px;
}
</style>
