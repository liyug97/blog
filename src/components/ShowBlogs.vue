<template>
    <div id="show-blogs">
      <h1>博客总览</h1>
      <input type="text" v-model="search" placeholder="搜索">
      <div v-for="blog in filteredblogs" class="single-blog">
         <h2 v-rainbow>{{blog.title | to-uppercase}}</h2>
         <article>
             {{blog.body | snippet}}
         </article>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'show-blogs',
    data () {
        return {
            blogs:[],
            search:''
        }
    },
    created () {
        this.$http.get('https://jsonplaceholder.typicode.com/posts').then(function(data){
            this.blogs=data.body.slice(0,10);
        })
    },
    computed: {
        filteredblogs:function(){
           return this.blogs.filter((blog)=>{
               return blog.title.match(this.search);
           })
        }
    },
    filters:{
        /*"to-uppercase":function(value){
            return value.toUpperCase();
        }*/
        toUppercase(value){
           return value.toUpperCase();
        },
        snippet:function(value){
            return value.slice(0,100)+'...';
        }
    },
    directives: {
        'rainbow':{
            bind(el,binding,vnode){
                el.style.color="#"+Math.random().toString(16).slice(2,8);
            }
        }
    }
  }
  </script>
  
  <style>
  #show-blogs{
    max-width: 800px;
    margin: 0 auto;
  }
  .single-blog{
      padding: 20px;
      margin: 20px 0;
      background: #eee;
      box-sizing: border-box;
  }
  input[type="text"]{
      width: 100%;
      box-sizing: border-box;
      padding: 8px;
  }
  </style>
  