<template>
  <el-container class="wrapper">
    <el-header class="header-bar">
      <!-- <img src="" alt="logo" class="header-logo"> -->
      <div class="fl logo">数据服务中心</div>
      <ul class="header-operations">
        <li>
          <i class="fa fa-user-circle-o"></i>
          <i class="rootname">root</i>
        </li>
        <li class="xian"></li>
        <li>
          <i class="fa fa-home"></i>
        </li>
        <li class="xian"></li>
        <li>
          <i class="fa fa-barcode"></i>
        </li>
        <li class="xian"></li>
        <li>
          <i class="fa fa-power-off"></i>
        </li>
      </ul>
    </el-header>
    <el-container class="wrapper">
      <el-aside width="150px">
        <el-menu :default-active="activeIndex" router class="menuBar" @select="handleSelect">
          <el-menu-item index="1" route="/resource">
            <i class="fa fa-tasks"></i>资源目录
          </el-menu-item>
          <el-menu-item index="2" route="/createcode">
            <i class="fa fa-codepen"></i>代码生成
          </el-menu-item>
          <el-menu-item index="3" route="/demo">
            <i class="fa fa-page"></i>模版demo
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "index",
  components: {},
  data() {
    return {
      activeIndex: "1",
      keyIndex: ""
    };
  },
  computed: {},

  methods: {
    handleSelect(key, keyPath) {
      this.keyIndex = key;
      console.log(key, keyPath);
    }
  },
  watch: {},
  created() {},

  mounted() {}
};
</script>
<style>
.fl {
  float: left;
}
.el-header {
  padding-left: 0 !important;
}
.logo {
  width: 149px;
  height: 60px;
  line-height: 60px;
  background: #515a6e;
  text-align: center;
  color: #fff;
}
</style>