<template>
  <div class="container">
    <el-carousel :interval="1500" type="card" height="320px">
      <el-carousel-item v-for="item in arr" :key="item.id">
        <img :src="item.img" class="image">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
  export default {
    data() {
    return {
      arr: [
        { id:0,
          img:require('../../assets/img2.jpg')
        },
        {
          id:1,
          img:require('../../assets/img3.jpg')
        },
        {
          id:2,
          img:require('../../assets/img4.jpg')
        },
        {
          id:3,
          img:require('../../assets/img5.jpg')
        },
        {
          id:4,
          img:require('../../assets/img6.jpg')
        }
      ]
    };
  }
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
  list-style: none;
}
.container {
  padding-top: 75px;
}
.image{
  width: 100%;
  height: 100%;
}
</style>