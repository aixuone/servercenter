<template>
  <div class="error-page">
    <div class="content-con">
      <img :src="src" alt="404" class="svgimg">
      <div class="text-con">
        <h4>{{ code }}</h4>
        <h5>{{ desc }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "error",
  components: {
  },
  props: {
    code: String,
    desc: String,
    src: String
  }
};
</script>
<style>
    .error-page{
        margin:50px auto;
        text-align: center;
    }
    .error-page{
        position: fixed;
        top: 50px;
        left:50px;
        bottom:50px;
        right:50px;
    }
     .error-page .svgimg{
         width: 50%;
     }
    .error-page h4,.error-page h5{
        margin: 10px;
        font-size: 30px;
    }

</style>
