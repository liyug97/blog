<template>
  <div>
    <TopMeau></TopMeau>
    <HomePage></HomePage>
    <AboutUs></AboutUs>
    <SecurityResearch></SecurityResearch>
    <photo></photo>
    <AddBlog></AddBlog>
    <ShowBlogs ref="ShowBlogs"></ShowBlogs>
    <Footer></Footer>
    <QuitBlog></QuitBlog>
  </div>
</template>
<script>
import HomePage from "./HomePage.vue";
import TopMeau from "../menu/TopMenu.vue";
import AboutUs from "../AboutUs/AboutUs.vue";
import SecurityResearch from "../SecurityResearch/SecurityResearch.vue";
import photo from "../photo/photo.vue";
import AddBlog from "../AddBlog/AddBlog.vue";
import ShowBlogs from "../ShowBlog/ShowBlogs.vue";
import QuitBlog from '../Quit/QuitBlog';
import Footer from "../Footer/Footer.vue";
export default {
  components: {
    TopMeau,
    HomePage,
    AboutUs,
    SecurityResearch,
    photo,
    AddBlog,
    ShowBlogs,
    QuitBlog,
    Footer
  },
  methods:{
    // 刷新展示博客的数据
    reFreshShowBlogsData() {
      this.$refs.ShowBlogs.queryList(1);
    }
  }
};
</script>
