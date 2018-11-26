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
            this.objList = [{
                id: "1",
                name: "车辆",
                type: "对象",
                defined: "carNumber",
                isDic: "true",
                description: "文本说明"
                },
                {
                id: "2",
                name: "挖掘机工人",
                type: "数据集",
                defined: "worker",
                isDic: "false",
                description: "文本说明"
                },
                {
                id: "3",
                name: "TYBOX",
                type: "数据集",
                defined: "boxNumber",
                isDic: "false",
                description: "文本说明"
            }];
            this.attrList = [{
               resId:'1',
               id:'0',
               jdbcType:'vchar', 
               length:'10',
               name:'机型',
               description:'出厂型号',
               type:'字典'
                },
                {
                resId:'1',
                id:'1',
                jdbcType:'vchar', 
                length:'10',
                name:'机型1',
                description:'出厂型号3',
                type:'字典'
                },{
                resId:'1',
                id:'2',
                jdbcType:'vchar', 
                length:'10',
                name:'机型2',
                description:'出厂型号1',
                type:'字典'
                },{
                resId:'1',
                id:'3',
                jdbcType:'vchar', 
                length:'10',
                name:'机型3',
                description:'出厂型号2',
                type:'字典'
            }];
            this.objList = api.getDataObjectsList({
                "type":"对象"
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
                    // this.objAttr[v] = api.getDataObjectAttrsList({
                    //     resId : v
                    // });
                    if (v==1) {
                        this.objAttr[v] = [{
                            resId:'1',
                            id:'0',
                            jdbcType:'vchar', 
                            length:'10',
                            name:'机型',
                            description:'出厂型号',
                            type:'字典'
                            },
                            {
                            resId:'1',
                            id:'1',
                            jdbcType:'vchar', 
                            length:'10',
                            name:'机型1',
                            description:'出厂型号3',
                            type:'字典'
                            },{
                            resId:'1',
                            id:'2',
                            jdbcType:'vchar', 
                            length:'10',
                            name:'机型2',
                            description:'出厂型号1',
                            type:'字典'
                            },{
                            resId:'1',
                            id:'3',
                            jdbcType:'vchar', 
                            length:'10',
                            name:'机型3',
                            description:'出厂型号2',
                            type:'字典'
                        }];                        
                    }else{
                        this.objAttr[v] = [{
                            resId:'2',
                            id:'0',
                            jdbcType:'vchar', 
                            length:'10',
                            name:'机型',
                            description:'出厂型号',
                            type:'字典'
                            },
                            {
                            resId:'2',
                            id:'1',
                            jdbcType:'vchar', 
                            length:'10',
                            name:'机型1',
                            description:'出厂型号3',
                            type:'字典'
                            },{
                            resId:'2',
                            id:'2',
                            jdbcType:'vchar', 
                            length:'10',
                            name:'机型2',
                            description:'出厂型号1',
                            type:'字典'
                            },{
                            resId:'2',
                            id:'3',
                            jdbcType:'vchar', 
                            length:'10',
                            name:'机型3',
                            description:'出厂型号2',
                            type:'字典'
                        }];
                    }
                }
                this.attrList = this.objAttr[v];
            }
        }
    }
</script>