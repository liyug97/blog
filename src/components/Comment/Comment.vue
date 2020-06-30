<template>
  <div>
    <div class="input">
      <el-form :model="comment">
          <el-form-item label="评论人:" class="label">
            <el-input
              placeholder="请输入用户名"
              v-model="comment.author"
              class="commenter"
            ></el-input>
          </el-form-item>
          <el-form-item label="评论内容:" class="label">
            <el-input
              type="textarea"
              v-model="comment.content"
              :rows="5"
              placeholder="评论内容"
            ></el-input>
          </el-form-item>       
        <el-button type="primary" @click="submit_comment" class="submit-btn"
          >提交评论</el-button
        >
      </el-form>
      <div class="showblogs">
        <h2 align="center">评论总览</h2>
        <div v-for="comment in newComments" class="single-blog">
            <h2>用户:{{ comment.author }}</h2>
          <p>
            评论内容:{{ comment.content }}
          </p>
          <div class="btn">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-delete"
              @click="deleteComment(comment.id)"
            ></el-button>
          </div>
        </div>
        <el-pagination
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
    </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { MessageBox } from "element-ui";
export default {
  data() {
    return {
      comment: {
        author: "",
        content: ""
      },
      comments:[],
      search: "",
      pageSize: 3,
      curPage: 1, //当前页码
      total: 0 ,//当前条数
      submited: false,
      props: ['id'],
    };
  },
  created() {
    let articleId=this.$route.params.id;
    this.queryList(1,articleId);
  },
  computed: {
    newComments:function(){
      var _this=this;
      var newComments=[];
      this.comments.map(function(comment){
        if(comment.author.search(_this.search)!=-1){
          newComments.push(comment);
        }
      });
      return newComments;
    }
  },
  methods: {
    currentPage(pageNo){
    let articleId=this.$route.params.id;
    this.curPage=pageNo
    this.queryList(pageNo,articleId);
  },
  deleteComment(id) {
      MessageBox.confirm("", {
        message: "你确定删除吗？",
        title: "提示",
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      })
        .then(action => {
          if (action == "confirm") {
            this.commentDelete(id);
          }
        })
        .catch(err => {
          if (err == "cancel") {
            console.log(2);
          }
        });
    },
    async queryList(pageNo,blogId) {
      const ret = await axios.post("/api/comment/commentList", {pageNo, pageSize: this.pageSize,blogId});
      const res = ret.data;
      if (res.code === 0) {
        this.comments = res.data.commentList;
        this.total = res.data.total;
        console.log(this.comments);
      } else {
        MessageBox.alert(res.msg);
      }
    },
    commentDelete(id) {
      let articleId=this.$route.params.id
      axios.post("/api/comment/deleteComment", { id }).then(ret => {
        const res = ret.data;
        if (res.code === 0) {
          MessageBox.alert("删除成功！");
          this.queryList(1,articleId);
        } else {
          MessageBox.alert(res.msg);
        }
      });
    },
    submit_comment() {
      let articleId=this.$route.params.id
      if(this.comment.author === '' || this.comment.content === ''){
        alert('用户名或评论内容不能为空！')
      }else{
        axios
        .post("/api/comment/setComment",{
          author: this.comment.author,
          content: this.comment.content,
          blogId:articleId
        },)
        .then(res => {
          this.commentData = res.data;
          this.$message({
          message: '发表评论成功',
          type: 'success',
          offset:100
        });
          this.queryList(1,articleId);
          this.comment.author=''
          this.comment.content=''
        })
        .catch(function(error) {
          console.log(error);
        });
    }
      }    
      }  
};
</script>
<style scoped>
.label .el-form-item__label{
  font-size: 18px;
  font-weight: bold;
 }
 .h2{
   color:white;
 }
.input {
  margin: 10px auto;
  padding: 2px;
}
#preview {
  padding: 10px 20px;
  border: 1px dotted #ccc;
  margin: 30px 0;
}
.showblogs {
  max-width: 800px;
  margin: 0 auto;
  height: 580px;
}
.showblogs h2{
  color: rgb(13, 85, 192);
}
.single-blog {
  padding: 20px;
  margin: 20px 0;
  background: #eee;
  box-sizing: border-box;
  border-radius: 15px;
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
