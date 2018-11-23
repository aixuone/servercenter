<template>
    <el-container class="wrapper">
        <el-header class="header-bar">
            <img src="" alt="logo" class="header-logo">
            <ul class="header-operations">
                <li>菜单一</li>
                <li>菜单二</li>
                <li>菜单三</li>
                <li>菜单四</li>
            </ul>
        </el-header>
        <el-container>
            <el-aside>
                <el-menu default-active="1">
                <el-menu-item index="2">菜单1</el-menu-item>
                <el-menu-item index="1">菜单2</el-menu-item>
                <el-menu-item index="3">菜单3</el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <el-breadcrumb>
                    <el-breadcrumb-item>菜单</el-breadcrumb-item>
                    <el-breadcrumb-item>菜单</el-breadcrumb-item>
                    <el-breadcrumb-item>菜单</el-breadcrumb-item>
                </el-breadcrumb>
                <!-- <modalpage></modalpage> -->
                <viewObjAttr></viewObjAttr>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import modalpage from './views/modalpage.vue';
import viewObjAttr from './views/viewObjAttr.vue';
export default {
  name: "app",
components: {
    modalpage,
    viewObjAttr
},
  data() {
    return {};
  },
  computed: {},

  methods: {},

  created() {},

  mounted() {}
};
</script>
