<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <div class="breadxian"></div>
      <el-breadcrumb-item>{{headerTitle}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="breadbottom"></div>
    <br>
    <!-- 搜索 -->
    <el-form
      inline
      :model="viewSearch"
      label-position="right"
      label-width="80px"
    >
      <div style="display:inline-block;">
        <div
          v-for="(item,index) in viewSearch.data"
          :key="index"
        >
          <el-form-item
            label="字段"
            width="100"
          >
            <el-select
              v-model="item.key"
              placeholder="请选择"
            >
              <el-option
                v-for="(i,j) in attrs"
                :key="j"
                :label="i.name"
                :value="i.columnName"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="item.condition"
              placeholder="请选择"
            >
              <el-option
                label=">"
                value="great than"
              ></el-option>
              <el-option
                label="="
                value="equals"
              ></el-option>
              <el-option
                label="<"
                value="less than"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="item.value"
              placeholder="输入名称/说明关键词"
            ></el-input>
          </el-form-item>
          <i
            class="fa fa-minus-circle"
            @click="handleDelThis(index)"
            style="font-size:20px,color:red"
          ></i>
        </div>
      </div>
      <el-form-item>
        <i
          class="fa fa-plus-circle"
          @click="handleAddSer()"
          style="font-size:30px"
        ></i>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="getTableData()"
        >查询</el-button>
      </el-form-item>
    </el-form>
    <br>
    <div class="viewTableClass">
      <el-table
        :data="viewTable.data"
        border
        :header-cell-style="{background:'#f9fafc'}"
      >
      <el-table-column
      type="index"
      width="100">
    </el-table-column>
      
        <el-table-column
          v-for="(item,index) in attrs"
          :key="index"
          :prop="item.columnName"
          :label="item.name"
          width="150px"
        >
        </el-table-column>

      </el-table>

    </div>
  </div>
</template>

<script>
import axios from "@/libs/axios";
import api from "@/api/data-model/data";
import { Message } from "element-ui";
export default {
  name: "viewDataObj",
  components: {},
  data() {
    return {
      headerTitle: "数据",
      resId: "",
      //页面类型
      viewType: false,
      attrs: [],
      //页面表格
      viewTable: {
        //dom元素id
        domId: "",
        //样式表类名
        className: "",
        pageInfo: {
          //当前页码
          page: 1,
          //数据总数量
          count: 0,
          //每页包含数据量
          pageSize: 15,
          total: ""
        },
        //数据
        data: []
      },
      //数据搜索
      viewSearch: {
        data: [{ key: "", condition: "", value: "" }]
      }
    };
  },
  created() {
    this.resId = parseInt(this.$route.path.split("/")[2]);
    this.getAttrs();
    this.getTableData();
  },
  methods: {
    handleAddSer() {
      this.viewSearch.data.push({ key: "", condition: "", value: "" });
    },
    handleDelThis(index) {
      this.viewSearch.data.splice(index, 1);
      if (this.viewSearch.data.length == 0) {
        this.viewSearch.data.push({});
      }
    },
    // 获取属性列表
    getAttrs() {
      api
        .getDataObjectAttrsList({
          resId: this.resId,
          pageInfo: { page: 0, pageSize: 0 }
        })
        .then(res => {
          this.attrs = res.data.list;
        })
        .catch(error => {
          console.log(error);
          Message.error("获取属性列表失败。", error);
        });
    },
    //获取表格数据
    getTableData() {
        console.log("ser",this.viewSearch.data);
      api
        .viewData({
          condition: this.viewSearch.data,
          dataObjectId: this.resId,
          pageInfo: { page: 0, pageSize: 0 }
        })
        .then(res => {
          this.viewTable.data = res.data.rtnData;
        })
        .catch(error => {
          console.log(error);
          Message.error(error);
        });
    }
  }
};
</script>
