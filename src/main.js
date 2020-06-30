// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Routes from './routes'
import ElementUI from 'element-ui'
import {Message} from 'element-ui'
import echarts from "echarts";
Vue.prototype.$echarts = echarts;
Vue.prototype.$message=Message
import 'element-ui/lib/theme-chalk/index.css'
import qs from 'qs'
//导入字体图标
import './assets/font_1670389_j8e0bcacy6/iconfont.css'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(qs)
//自定义指令(全局)
/*Vue.directive('rainbow',{
  bind(el,binding,vnode){
     el.style.color="#"+Math.random().toString(16).slice(2,8);
  }
})*/
//自定义过滤器(全局)
//Vue.filter('to-uppercase',function(value){
  //return value.toUpperCase();
//})
//Vue.filter('snippet',function(value){
  //return value.slice(0,100)+'...';
//})
//创建路由
const router=new VueRouter({
   routes:Routes,
   mode:"history"
})
//实现路由跳转页面在顶部
router.afterEach((to,from,next) => {
  window.scrollTo(0,0)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<router-view></router-view>',
  router:router
})
