<template>
  <div class="resource">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <div class="breadxian"></div>
      <el-breadcrumb-item :to="{ path: '/resourcetype' }">资源分类维护</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="breadbottom"></div>
    <el-tree
      :data="typeData"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      style="width:400px;"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <!-- <span>{{ data.typeName }}</span> -->
        <el-input
          v-model="data.typeName"
          placeholder="输入字段注解"
          class="customer-edit"
          @blur="editType(data)"
          @change="changeType"
        ></el-input>
        <span>
          <el-button type="text" size="mini" @click="() => append(data)">添加下级</el-button>
          <el-button type="text" size="mini" @click="() => remove(node, data)">删除</el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>
<script>
import api from "@/api/data-model/data";
import { Message } from "element-ui";
let count = 1;
export default {
  data() {
    return {
      typeData: [],
      changed: false
    };
  },
  created() {
    this.getTypeDataTree();
    //this.getDataObjectsList();
  },
  methods: {
    append(data) {
      const newChild = {
        typeName: "新增节点" + count++,
        fatherId: data.id,
        category: data.category,
        children: []
      };
      api
        .addSourceType(newChild)
        .then(res => {
          console.log("我是成功返回的res1", res);
          newChild.id = res.data.id;
          if (!data.children) {
            this.$set(data, "children", []);
          }
          data.children.push(newChild);
        })
        .catch(error => {
          console.log(error);
          Message.error(error.data.message);
        });
    },

    remove(node, data) {
      if(node.childNodes && node.childNodes.length > 0) {
        Message.error("请先删除子节点");
        return;
      }
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);

      api
        .delSourceType({
          id: data.id
        })
        .then(res => {
          console.log("我是成功返回的res1", res);
          children.splice(index, 1);
        })
        .catch(error => {
          console.log(error);
          Message.error(error.data.message);
        });
    },
    editType(data) {
      if (this.changed) {
        api
          .editSourceType(data)
          .then(res => {
            console.log("我是成功返回的res1", res);
            this.changed = false;
          })
          .catch(error => {
            console.log(error);
            Message.error(error.data.message);
          });
      }
    },
    changeType(value) {
      this.changed = true;
    },
    getTypeDataTree() {
      api
        .getTypeDataTree({
          pid: -1
        })
        .then(res => {
          console.log("我是成功返回的res", res);
          this.typeData = res.data.list;
        })
        .catch(error => {
          console.log(error);
          Message.error(error.data.message);
        });
    }
  }
};
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.customer-edit input {
  border: 0;
  outline: 0;
  width: 200px;
  background: none;
}
</style>