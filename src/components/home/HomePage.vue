<template>
  <div class="homepage">
    <div class="content">
      <div class="box" id="box1"></div>
      <div class="box" id="box2"></div>
      <p>{{ sign }}</p>
      <div class="box" id="box3"></div>
      <div class="box" id="box4"></div>
    </div>
  </div>
</template>
<script>
import TopMenu from "../menu/TopMenu.vue";
export default {
  name: "HomePage",
  components: {
    TopMenu
  },
  data() {
    return {
      sign: "欢迎来到个人博客"
    };
  },
};
</script>
<style scoped>
.homepage {
  height: 550px;
  background: url("../../assets/img1.jpg") no-repeat;
  background-size: 100% 110%;
  color: #fff;
  font-size: 28px;
  margin-top: 100px;
  animation: bg infinite 98s linear alternate;
}
@keyframes bg {
  0% {
    background-size: 110% 130%;
  }
  10% {
    background-size: 111% 131%;
  }
  20% {
    background-size: 112% 132%;
    background-position: bottom;
  }
  30% {
    background-size: 113% 133%;
  }
  40% {
    background-size: 114% 134%;
  }
  50% {
    background-size: 115% 135%;
    background-position: left;
  }
  60% {
    background-size: 116% 136%;
  }
  70% {
    background-size: 117% 137%;
  }
  80% {
    background-size: 118% 138%;
    background-position: right;
  }
  90% {
    background-size: 119% 139%;
  }
  100% {
    background-size: 120% 140%;
  }
}
@-moz-keyframes bg {
  0% {
    background-size: 110% 130%;
  }
  10% {
    background-size: 111% 131%;
  }
  20% {
    background-size: 112% 132%;
    background-position: bottom;
  }
  30% {
    background-size: 113% 133%;
  }
  40% {
    background-size: 114% 134%;
  }
  50% {
    background-size: 115% 135%;
    background-position: left;
  }
  60% {
    background-size: 116% 136%;
  }
  70% {
    background-size: 117% 137%;
  }
  80% {
    background-size: 118% 138%;
    background-position: right;
  }
  90% {
    background-size: 119% 139%;
  }
  100% {
    background-size: 120% 140%;
  }
}
@-ms-keyframes bg {
  0% {
    background-size: 110% 130%;
  }
  10% {
    background-size: 111% 131%;
  }
  20% {
    background-size: 112% 132%;
    background-position: bottom;
  }
  30% {
    background-size: 113% 133%;
  }
  40% {
    background-size: 114% 134%;
  }
  50% {
    background-size: 115% 135%;
    background-position: left;
  }
  60% {
    background-size: 116% 136%;
  }
  70% {
    background-size: 117% 137%;
  }
  80% {
    background-size: 118% 138%;
    background-position: right;
  }
  90% {
    background-size: 119% 139%;
  }
  100% {
    background-size: 120% 140%;
  }
}
.content {
  display: inline-block;
  position: relative;
  top: 35%;
}
p {
  margin-left: 470px;
  text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.5);
  letter-spacing: 10px;
  color: rgb(126, 185, 245);
  font-weight: bold;
}
.box {
  display: inline-block;
  width: 100px;
  height: 20px;
}
#box1 {
  border-left: 8px solid;
  border-top: 8px solid;
  position: relative;
  right: -350px;
  bottom: 20px;
}
#box2 {
  border-top: 8px solid;
  border-right: 8px solid;
  position: relative;
  left: 650px;
  bottom: 20px;
}
#box3 {
  border-left: 8px solid;
  border-bottom: 8px solid;
  position: relative;
  right: -350px;
  top: 20px;
}
#box4 {
  border-right: 8px solid;
  border-bottom: 8px solid;
  position: relative;
  left: 650px;
  top: 20px;
}
</style>
