<template>
  <el-form
    inline
    :model="data"
    label-position="right"
    label-width="80px"
  >
    <label>数据字典映射：</label>
    <el-form-item label="key:">
      <el-select
        v-model="key"
        placeholder="请选择"
        class="form-medium-width"
      >
        <el-option
          v-for="(item,index) in objlist"
          :key="index"
          :label="item.name"
          :value="item.columnName"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="value:">
      <el-select
        v-model="value"
        placeholder="请选择"
        class="form-medium-width"
      >
        
        <el-option
          v-for="(item,index) in objlist"
          :key="index"
          :label="item.name"
          :value="item.columnName"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="父ID:">
      <el-select
        v-model="parentId"
        placeholder="请选择"
        class="form-medium-width"
      >
        <el-option label="--" value=""></el-option>
        
        <el-option
          v-for="(item,index) in objlist"
          :key="index"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="handleSubmit()"
      >提交</el-button>

    </el-form-item>
  </el-form>
</template>
<script>
import api from "@/api/data-model/data";
import { Message } from "element-ui";
export default {
  name: "dictBindAttr",
  props: {
    resId: Number
  },
  data() {
    return {
      objlist: [],
      key: '',
      value: '',
      parentId: '',
      data:{}
    };
  },
  created() {

      api
          .getDataObjectAttrsList({
            resId:this.resId,
            pageInfo: {
              page: 0,
              pageSize: 0
            }
          })
          .then(res => {
            this.objlist = res.data.list;
          })
          .catch(error => {
            console.log(error);
            Message.error("获取对象列表失败。", error);
          });

  },
  methods: {
    handleSubmit() {
        var params = {}
            params.dataObjectId=this.resId;
        if(this.pid==""){ params.pid = this.parentId};
          params.keyName = this.key;
            params.valueName = this.value;
        api
            .dictBind(params)
            .then(res=>{Message.success("绑定成功。")})
            .catch(error=>{Message.error(" 绑定失败。"+error.data.message)})
    }
  }
};
</script>