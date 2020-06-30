import Vue from "vue";
import Router from "vue-router";
import Login from "./components/login/login.vue";
import Home from "./components/home/Home.vue";
import ShowDetail from './components/DetailBlog/ShowDetail';
import EditBlog from './components/EditBlog/EditBlog.vue'
import Comment from './components/Comment/Comment.vue'
import Forget from './components/ForgotPassword/Forget.vue'
import UpdatePwd from './components/UpdatePwd/UpdatePwd.vue'
Vue.use(Router);
export default [
  {
    path: "/",
    component: Login
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/home",
    name:'home',
    component: Home
  },
  {
    path: "/detail/:id",
    component:ShowDetail
  },
  {
    path: "/edit/:id",
    component:EditBlog
  },
  {
    path: "*",
    component: Login
  },
  {
    path: "/comment",
    component: Comment
  },
  {
    path: "/forget",
    component: Forget
  },
  {
    path: "/update",
    component: UpdatePwd
  },
];
