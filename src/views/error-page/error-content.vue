<template>
  <div class="error-page">
    <div class="content-con">
      <svg404></svg404>
      <div class="text-con">
        <h4 class="code">错误代码：{{ code }}</h4>
        <h5>{{ desc }}</h5>
        <h5>{{second}}秒后，回到主页</h5>
      </div>
    </div>
  </div>
</template>

<script>
import svg404 from "./svg-404";
export default {
  name: "error",
  components: {
    svg404
  },
  props: {
    code: String,
    desc: String,
    src: String
  },
  data() {
    return {
      second: 5
    };
  },
  mounted() {
      this.killTime();
  },
  methods: {
    killTime() {
      if (this.second > 0) {
        setTimeout(() => {
          this.killTime(--this.second);
        }, 999);
      } else {
        this.$router.push({ path: "/" });
      }
    }
  }
};
</script>
<style>
.error-page {
  margin: 50px auto;
  text-align: center;
}
.error-page {
  position: fixed;
  top: 50px;
  left: 50px;
  bottom: 50px;
  right: 50px;
}
.error-page .svgimg {
  width: 50%;
}
.error-page h4,
.error-page h5 {
  margin: 10px;
  font-size: 30px;
}
.text-con {
  position: relative;
  z-index: 999;
}
.text-con .code{
    color:#f00;
}
</style>
