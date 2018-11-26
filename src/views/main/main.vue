<template>
    <el-container class="wrapper">
        <el-aside width="250px">
            <el-menu default-active="1" router class="menuBar">
                <el-menu-item index="1" route="/">数据服务</el-menu-item>
                <!-- <el-menu-item index="1" route="/resource/dataset">数据集</el-menu-item>
                <el-menu-item index="3" route="/resource/dataobj">数据对象</el-menu-item> -->
                <el-menu-item index="2" route="/resource"><i class="fa fa-tasks"></i>资源目录</el-menu-item>
                <el-menu-item index="3" route="/createcode"><i class="fa fa-codepen"></i>代码生成</el-menu-item>
            </el-menu>
        </el-aside>

        <el-container>
            <el-header class="header-bar">
                <!-- <img src="" alt="logo" class="header-logo"> -->
                <ul class="header-operations">
                    <li><i class="fa fa-user-circle-o"></i> <i class="rootname">root</i></li>
                    <li class="xian"></li>
                    <li><i class="fa fa-home"></i></li>
                    <li class="xian"></li>
                    <li><i class="fa fa-barcode"></i></li>
                    <li class="xian"></li>
                    <li><i class="fa fa-power-off"></i></li>
                </ul>
            </el-header>
            <el-main>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <div class="breadxian"></div>
                    <el-breadcrumb-item :to="{ path: '/resource' }">资源目录</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/resource' }">资源目录</el-breadcrumb-item>
                </el-breadcrumb>
                <div class="breadbottom"></div>
                <!-- 路由 -->
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
  name: "index",
  components: {},
  data() {
    return {};
  },
  computed: {},

  methods: {},

  created() {},

  mounted() {}
};
</script>
