<template>
  <div class="showblogs">
    <h2>博客总览</h2>
    <el-input
      type="text"
      v-model="search"
      prefix-icon="iconfont iconchangyongtubiao_yonghusousuo"
      placeholder="请输入标题查询"
    />
    <div v-for="blog in newBlogs" class="single-blog">
      <router-link :to="{ path: '/detail/' + blog.id }">
        <h2>{{ blog.title }}</h2>
      </router-link>
      <p>
        {{ blog.type }}
      </p>
      <div class="btn">
        <el-button
          type="danger"
          size="small"
          icon="el-icon-delete"
          @click="deleteBlog(blog.id)"
        ></el-button>
        <router-link :to="{ path: '/edit/' + blog.id }"
          ><el-button
            type="primary"
            size="small"
            icon="el-icon-edit"
          ></el-button
        ></router-link>
      </div>
    </div>
    <el-pagination
      ref="Pagination"
      background
      layout="total, prev, pager, next"
      :total="total"
      :current-page="curPage"
      :page-size="pageSize"
      class="paging"
      @current-change="currentPage"
    >
    </el-pagination>
  </div>
</template>

<script>
import axios from "axios";
import { MessageBox } from "element-ui";
export default {
  name: "ShowBlog",
  data() {
    return {
      blogs: [],
      search: "",
      pageSize: 2, //每页显示的条数
      curPage: 1, //当前页码
      total: 0, //当前条数
    };
  }, 
  created() {
    this.queryList(1)
  },
  computed: {
    newBlogs: function () {
      var newBlogs = [];
      this.blogs.map((blog) => {
        if (blog.title.search(this.search) != -1) {
          newBlogs.push(blog);
        }
      });
       return newBlogs;
    },
  },
  methods: {
    currentPage(pageNo) {
      this.curPage=pageNo;
      this.queryList(pageNo);
    },
    deleteBlog(id) {
      MessageBox.confirm("", {
        message: "你确定删除吗？",
        title: "提示",
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      })
        .then((action) => {
          if (action == "confirm") {
            this.blogDelete(id);
          }
        })
        .catch((err) => {
          if (err == "cancel") {
            console.log(2);
          }
        });
    },
    async queryList(pageNo) {
      const ret = await axios.post("/api/blog/blogList", {
        pageNo,
        pageSize: this.pageSize,
      });
      const res = ret.data;
      if (res.code === 0) {
        this.blogs = res.data.blogList;
        this.total = res.data.total;
        console.log(res.data.blogList);
      } else {
        MessageBox.alert(res.msg);
      }
    },
    blogDelete(id) {
      axios.post("/api/blog/deleteBlog", { id }).then((ret) => {
        const res = ret.data;
        if (res.code === 0) {
          MessageBox.alert("删除成功！");
          this.queryList(1);
        } else {
          MessageBox.alert(res.msg);
        }
      });
    },
  },
};
</script>

<style>
.showblogs {
  max-width: 800px;
  margin: 0 auto;
  height: 580px;
}
.single-blog {
  padding: 20px;
  margin: 20px 0;
  background: #eee;
  box-sizing: border-box;
}
input[type="text"] {
  width: 100%;
  box-sizing: border-box;
  padding: 8px;
}
.btn {
  float: right;
  margin-top: -30px;
}
.paging {
  margin-left: 400px;
}
</style>
