<template>
<div style="width:100%;border: 1px solid #eee">       
    <el-row :gutter="20">
        <el-col :span="12">
            <p>浏览对象：</p>
            <el-select v-model="checkedObj" placeholder="请选择浏览对象" style="width:100%">
                <el-option v-for="(item,index) in this.objList"
                    :key="index"
                    :label="item.name"
                    :value="item.id">
                </el-option>
            </el-select>
            <div style="border: 1px solid #eee;margin-top:10px;height:100px;overflow-y:auto;">
                <p v-for="(item,index) in attrList" :key="index">
                    <el-checkbox v-model="checkedAttr" :label="item">{{item.name}}</el-checkbox>
                </p>
            </div>
        </el-col>
        <el-col :span="12" style="height:200px;overflow-y:auto;">
            <p>选择对象：</p>
            <p v-for="(item,index) in checkedAttr" :key="index" style="margin-left:10px;">
                <span>{{item.resId}}-</span>
                <el-checkbox v-model="checkedAttr" :label="item">{{item.id}}</el-checkbox>
            </p>
        </el-col>
    </el-row>
</div>
</template>
<script>
    import axios from "@/libs/axios";
    import api from '@/api/data-model/data';
    export default {
        name:"select_objAttr",
        data(){
            return {
                //备选 浏览列表列表
                objList:[],
                //备选 浏览对象属性列表
                attrList:[],
                // 浏览对象以及下面的属性列表 map类型
                objAttr:{},
                //已选 浏览对象
                checkedObj:"",
                // 已选 属性列表
                checkedAttr:[],
            }
        },
        created() {
            // 获取浏览对象列表
            this.objList = [];
            //属性列表
            this.attrList = [];
            api.getDataObjectsList({
                "type": "对象",
                "isDic": "",
                "name": "",
                "pageInfo":""
            }).then(res => {
                this.objList = res.data.list})
            .catch(error => {
                    console.log(error);
                    Message.error(error)
            });
        },
        mounted () {
        },
        methods: {
        },
        watch: {
            //根据 所选对象 获取对应属性列表
            checkedObj(v){
                if(!this.objAttr[v]){
                    this.objAttr[v] = api.getDataObjectAttrsList({
                        resId : v
                    });
                }
                this.attrList = this.objAttr[v];
            }
        }
    }
</script>