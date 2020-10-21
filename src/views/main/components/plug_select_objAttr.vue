<template>
  <div class="select_objAttr">
    <el-row :gutter="20">
      <el-col :span="12">
        <p>浏览对象：</p>
        <el-select
          v-model="checkedObiIndex"
          placeholder="请选择浏览对象"
          style="width:100%"
        >
          <el-option
            v-for="(item,index) in this.objList"
            :key="index"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <div style="border: 1px solid #eee;margin-top:10px;height:150px;overflow-y:auto;">
          <p
            v-for="(item,index) in attrList"
            :key="index"
          >
            <el-checkbox
              v-model="checkedAttr"
              :label="(selectedName(item.resId)+','+item.name+','+item.id + ','+item.resId)"
            >{{item.name}}</el-checkbox>
          </p>
        </div>
      </el-col>
      <el-col
        :span="12"
        style="height:200px;overflow-y:auto;"
      >
        <p>选择对象：</p>
        <p>
            <label style="display:inline-block;width:45%;">对象名称</label>
            <label style="display:inline-block;width:45%;">属性名称</label>
        </p>
        <p
          v-for="(item,index) in checkedAttr"
          :key="index"
          style="margin-left:10px;"
        >
          <label style="display:inline-block;width:45%;">{{item.split(",")[0]}}</label>
          <el-checkbox
            v-model="checkedAttr"
            :label="item"
            style="width:45%;"
          >{{item.split(",")[1]}}</el-checkbox>
        </p>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from "@/libs/axios";
import api from "@/api/data-model/data";
import { Message } from "element-ui";
export default {
  name: "select_objAttr",
  props:{
      objs:Array,
      checkedList:Array
  },
  data() {
    return {
      //备选 浏览列表列表
      objList: [],
      //备选 浏览对象属性列表
      attrList: [],
      // 浏览对象以及下面的属性列表 map类型
      objAttr: {},
      //已选 浏览对象
      checkedObiIndex: "",
      // 已选 属性列表
      checkedAttr: []
    }
  },
  created() {
    // 获取浏览对象列表
    this.objList = [];
    console.log("select plug checkedList",this.checkedList);
    if (this.checkedList&&this.checkedList.length>0) {
      this.checkedAttr = this.checkedList;
    }
    //属性列表
    this.attrList = [];
    if (!this.objs) {
        api
          .getDataObjectsList({
            type: "对象",
            isDic: "",
            name: "",
            pageInfo: {
              page: 0,
              pageSize: 0
            }
          })
          .then(res => {
            this.objList = res.data.list;
          })
          .catch(error => {
            console.log(error);
            Message.error("获取对象列表失败。", error);
          });
        
    }else{
        this.objList = this.objs;
    }
  },
  mounted() {},
  methods: {
      selectedName(resId){
            for (let index = 0; index < this.objList.length; index++) {
                const element = this.objList[index];
                if(element.id == resId){
                    return element.name;
                }
            } 
      },
      changeCheckedAttr(){
          var arr = [];
          console.log("this.checkedAttr",this.checkedAttr);
          this.checkedAttr.forEach((i,j) => {
              var o = {};
              o['resId'] = i.split(",")[3];
              o['id'] = i.split(",")[2];
              arr[j] = o;
          });
          console.log("供使用的checkedAttr",arr);
          return arr;
      }
  },
  watch: {
    //根据 所选对象 获取对应属性列表
    checkedObiIndex(v) {
      if (!this.objAttr[v]) {
          this.attrList=[];
        api
          .getDataObjectAttrsList({ resId: v ,pageInfo:{
              page: 0,
              pageSize: 0
          }})
          .then(res => {
            this.attrList = res.data.list;
          })
          .catch(error => {
            console.log(error);
            Message.error("获取属性列表失败。", error);
          });
      }
    },
    checkedAttr(val){
        var o  = this.changeCheckedAttr();
        console.log("changeCheckedAttr()",o);
        this.$emit("listenDatasetAttrs",o);
    }
  }
};
</script>
<style lang="css" scoped>
  .select_objAttr{
    width:100%;
    border: 1px solid #eee;
    text-align: left!important;
  }
</style>