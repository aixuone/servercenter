<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <div class="breadxian"></div>
      <el-breadcrumb-item>{{headerTitle}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="breadbottom"></div>
    <br>
    <!-- 搜索 -->
    <el-form inline :model="viewSearch" label-position="right" label-width="80px">
      <div style="display:inline-block;">
        <div v-for="(item,index) in viewSearch.data" :key="index">
          <el-form-item label="字段" width="100">
            <el-select v-model="item.key" placeholder="请选择">
              <el-option v-for="(v,k) in paramMap" :key="k" :label="k" :value="k"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="等于">
          </el-form-item>
          <el-form-item>
            <el-input v-model="item.value" placeholder="输入名称/说明关键词"></el-input>
          </el-form-item>
          <i
            class="fa fa-minus-circle"
            @click="handleDelThis(index)"
            style="font-size:20px,color:red"
          ></i>
        </div>
      </div>
      <el-form-item>
        <i class="fa fa-plus-circle" @click="handleAddSer()" style="font-size:30px"></i>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getTableData()">查询</el-button>
      </el-form-item>
    </el-form>
    <br>
    <div class="viewTableClass" style="height:500px;">
      <el-table
        :data="viewTable.data"
        border
        :header-cell-style="{background:'#f9fafc'}"
        height="100%"
      >
        <el-table-column type="index" width="100"></el-table-column>

        <el-table-column
          v-for="(item,index) in attrsIncludeDic"
          :key="index"
          :prop="item.name"
          :label="item.comment"
          width="150px"
        ></el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <el-pagination
      class="pageArea"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="viewTable.pageInfo.page"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="viewTable.pageInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="viewTable.pageInfo.total"
    ></el-pagination>
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
      resKey: 0,
      resKeyValue: "",
      //页面类型
      viewType: false,
      attrs: [],
      paramMap: {},
      attrsIncludeDic: {},
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
          pageSize: 100,
          total: 10
        },
        //数据
        data: []
      },
      //数据搜索
      viewSearch: {
        data: [{ key: "", condition: "", value: "" }]
      },
      viewAdd: {
        index: "",
        data: {},
        show: false
      },
      viewEdit: {
        index: "",
        data: {},
        show: false
      },
      //数据删除功能
      viewDelet: {
        show: false,
        item: {},
        index: ""
      },
      dics: {}
    };
  },
  created() {
    this.resId = parseInt(this.$route.path.split("/")[2]);
    this.getAttrs();
    this.getAttrsIncludeDic();
    this.getTableData();
  },
  methods: {
    handleAddSer() {
      this.viewSearch.data.push({ key: "", condition: "", value: "" });
    },
    handleDelThis(index) {
      this.viewSearch.data.splice(index, 1);
      if (this.viewSearch.data.length == 0) {
        // this.viewSearch.data.push({});
      }
    },
    //获取表格数据
    getTableData() {
      var me=this;
      console.log("ser", me.viewSearch.data);
      var arr = me.viewSearch.data.slice();
      var params = {};
      for (var index = arr.length - 1; index >= 0; --index) {
        var element = arr[index];
        if (element.key == "") {
          arr.splice(index, 1);
        } else {
          params[element.key]=element.value;
        }
      }      
      api
        .viewData({
          condition: params,
          dataObjectId: this.resId,
          pageInfo: this.viewTable.pageInfo
        })
        .then(res => {
          me.viewTable.data = res.data.rtnData;
          me.viewTable.pageInfo.total = res.data.pageInfo.total;
        })
        .catch(error => {
          console.log(error);
          Message.error(error.data.message);
          me.viewTable.data=[];
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.viewTable.pageInfo.page = 1;
      this.viewTable.pageInfo.pageSize = val;
      this.getTableData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.viewTable.pageInfo.page = val;
      this.getTableData();
    },
    diff(obj1, obj2) {
      console.log("我是diff", 1111);
      // console.log('obj12'+ obj1,obj2)
      var o1 = obj1 instanceof Object;
      var o2 = obj2 instanceof Object;
      console.log(22, o1, o2);
      if (!o1 || !o2) {
        /*  判断不是对象  */
        return obj1 === obj2;
      }

      if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false;
        //Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
      }

      for (var attr in obj1) {
        console.log("属性", attr);
        var t1 = obj1[attr] instanceof Object;

        var t2 = obj2[attr] instanceof Object;
        console.log(55, t1, t2);
        if (t1 && t2) {
          console.log(888);
          return diff(obj1[attr], obj2[attr]);
        } else if (obj1[attr] !== obj2[attr]) {
          console.log(999);
          return false;
        }
      }
      return true;
    },
    // 对话框关闭事件
    closeDialog(formRes) {
      // 点击关闭 数据重置
      formRes = formRes || "addform";
      this.$refs[formRes].resetFields();
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
          for(let i=0;i<res.data.list.length;i++){
            if(this.attrs[i].description != null && this.attrs[i].description != ""){
              this.getColumn(this.attrs[i].description);
            }
          }
        })
        .catch(error => {
          console.log(error);
          Message.error("获取属性列表失败。", error);
        });
    },
    getColumn(description) {
      if(description.indexOf("#{") != -1){
        let paramName = description.substring(description.indexOf("#{")+2,description.indexOf("}"));
        this.paramMap[paramName]=paramName;
        let tmpDescription = description.substring(description.indexOf("}"));
        if(tmpDescription.indexOf("#{") != -1) {
          this.getColumn(tmpDescription.substring(1));
        }
      }
    },
    // 获取属性列表（附带字典信息）
    getAttrsIncludeDic() {
      api
        .getDataSetColumns({
          resId: this.resId
        })
        .then(res => {
          this.attrsIncludeDic = res.data.list;
        })
        .catch(error => {
          console.log(error);
          Message.error("获取属性列表失败。", error);
        });
    }
  }
};
</script>
