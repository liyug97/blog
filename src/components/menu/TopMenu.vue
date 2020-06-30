<template>
  <!-- components/TopMenu.vue -->
  <div class="menupage">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <p class="logo-title"><i class="el-icon-user"></i>Guoliyu</p>
      <el-menu-item index="1" style="margin-left:250px;">首页</el-menu-item>
      <el-menu-item index="2">个人简介</el-menu-item>
      <el-menu-item index="3">个人技能</el-menu-item>
      <el-menu-item index="4">个人相册</el-menu-item>
      <el-menu-item index="5">写博客</el-menu-item>
      <el-menu-item index="6">展示博客</el-menu-item>
      <el-menu-item index="7">联系我们</el-menu-item>
      <el-menu-item index="8">退出博客</el-menu-item>
 </el-menu>
  </div>
</template>
<script>
  export default {
    name: "topMenu",
    data() {
      return {
        activeIndex2:'1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        if (key == '6') {
          this.$parent.reFreshShowBlogsData();
        }
        var name = "";
        if (key === "1") name = "homepage";
        if (key === "4") name = "container";
        if (key === "3") name = "securityresearch";
        if (key === "2") name = "aboutus";
        if (key === "5") name = "addblog";
        if (key === "6") name = "showblogs";
        if (key === "7") name = "contact";
        if (key === "8") name = "quitblog";
        var targetEle = document.querySelector("." + name);
        var offsetTop = targetEle.offsetTop;
        document.documentElement.scrollTop = offsetTop - 125;
      }
    }
  };
  </script>
<style>
.menupage {
  position: fixed;
  width: 98.8%;
  top: 0px;
  z-index: 100;
}
.menupage .el-menu.el-menu--horizontal {
  border-bottom: none;
  height: 100px;
  line-height: 100px;
}
.menupage .el-menu.el-menu--horizontal > .el-menu-item,
.menupage .el-menu--horizontal > .el-submenu .el-submenu__title {
  height: 100px;
  line-height: 100px; 
  padding: 0px 26px;
  font-size: 16px;
  letter-spacing: 5px;
  margin-left: -10px;
}
.menupage .el-menu--horizontal > .el-menu-item.is-active,
.menupage .el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
  border-bottom-width: 4px;
}
.menupage .logo-title .el-icon-user {
  margin-right: 5px;
}
</style>
<style scoped>
.logo-title {
  position: absolute;
  left: 82px;
  top: -25px;
  color: #fff;
  font-size: 26px;
  cursor: pointer;
}
.logo-title img {
  width: 80px;
  outline: none;
  vertical-align: middle;
}
</style>

