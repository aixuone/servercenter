<template>
    <div>
        <br>
        <!-- 搜索 -->
        <el-form inline :model="viewSearch" label-position="right" label-width="80px">
            <div style="display:inline-block;">
                <div v-for="(item,index) in viewSearch.data" :key="index">
                    <el-form-item label="字段" width="100">
                        <el-select v-model="item.a" placeholder="请选择">
                            <el-option label="对象" value="对象"></el-option>
                            <el-option label="数据集" value="数据集"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="item.b" placeholder="请选择">
                            <el-option label=">" value=">"></el-option>
                            <el-option label="=" value="="></el-option>
                            <el-option label="<" value="<"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="item.c" placeholder="输入名称/说明关键词"></el-input>
                    </el-form-item>
                    <i class="fa fa-minus-circle" @click="handleDelThis(index)" style="font-size:20px,color:red"></i>
                </div>
            </div>
            <el-form-item>
                <i class="fa fa-plus-circle" @click="handleAddSer()" style="font-size:30px"></i>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearch()">查询</el-button>
            </el-form-item>
        </el-form>
        <br>
        <div class="viewTableClass">
            <el-table :data="viewTable.data" border :header-cell-style="{background:'#f9fafc'}">
                <el-table-column prop="id" label="ID" width="50"></el-table-column>
                <el-table-column prop="columnName" label="字段名" width="100"></el-table-column>
                <el-table-column prop="jdbcType" label="数据类型" width="100"></el-table-column>
                <el-table-column prop="length" label="数据长度" width="100"></el-table-column>
                <el-table-column prop="name" label="名称" width="100"></el-table-column>
                <el-table-column prop="description" label="说明"></el-table-column>
                <el-table-column prop="type" label="类型" width="100"></el-table-column>
                <el-table-column prop="disRes" label="引用字典对象" ></el-table-column>
                <el-table-column prop="rule" label="规则" width="100"></el-table-column>
                <el-table-column prop="isNull" label="是否为空"></el-table-column>
                <!-- <el-table-column prop="is" label="索引类型" width="100"></el-table-column> -->
                <el-table-column prop="iskey" label="是否主键" ></el-table-column>
                <el-table-column prop="isIncrement" label="自增序列" width="100"></el-table-column>
            </el-table>

        </div>
    </div>
</template>

<script>
import axios from "@/libs/axios";
import api from "@/api/data-model/data";
import { Message } from 'element-ui';
export default {
  name: "viewDataObj",
  components: {},
  data() {
    return {
      //页面类型
      viewType: false,
      //页面表格
      viewTable: {
        //dom元素id
        domId: "",
        //样式表类名
        className: "",
        page: {
          //当前页码
          p: 1,
          //数据总数量
          count: 0,
          //每页包含数据量
          size: 15
        },
        //数据
        data: []
      },
      //数据搜索
      viewSearch:{
          data:[{
              a:'',
              b:'',
              c:''
          }]
      }
    }
  },
  created() {
    this.viewTable.data = this._getViewTableData();
  },
  methods: {
    _getViewTableData() {
      return [
        {
          id: "1",
          columnName: "model",
          jdbcType: "vchar",
          length: "50",
          name: "机型",
          description: "出厂型号",
          type: "字典",
          disRes: "pc56-7",
          rule: "文本说明",
          isNull:"true",
          iskey:"true",
          isIncrement:"true"
        },
        {
          id: "2",
          columnName: "key",
          jdbcType: "int",
          length: "10",
          name: "启动",
          description: "启动装置",
          type: "文本",
          disRes: "pc56-7",
          rule: "文本说明",
          isNull:"false",
          iskey:"false",
          isIncrement:"false"
        }
      ];
    },
    handleAddSer(){
        this.viewSearch.data.push({});
    },
    handleDelThis(index){
        this.viewSearch.data.splice(index,1);
        if (this.viewSearch.data.length == 0) {
            this.viewSearch.data.push({});
        }
    }
  } 
};
</script>
