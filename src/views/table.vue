<template>
    <div class="viewTableClass">
            <table v-if="viewTable.data.length" :id="viewTable.domId" :class="viewTable.className">
                <thead>
                    <tr>
                        <th v-for="(i,j) in viewTable.data[0]" :key="i">{{j | keyToCN }}</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in viewTable.data" :key="index">
                        <td v-for="(i,j) in item" :key="j">{{i}}</td>
                        <td>
                            <button @click="handleEdit(item)">修改</button>
                            <button @click="handleDelet(item)">删除</button>
                            </td>
                    </tr>
                </tbody>
            </table>
            <p v-else >暂无数据</p>
        </div>
</template>
<script>
    export default{
        name:'itable',
        props: {
            iaction : String,
            imethod : String,
            iparams : Object
        },
        data(){
            return{
                //页面表格
                viewTable:{
                    //dom元素id
                    domId:"",
                    //样式表类名
                    className:"",
                    page:{
                        //当前页码
                        p:1,
                        //数据总数量
                        count:0,
                        //每页包含数据量
                        size:15,
                    },
                    //数据
                    data:[]
                },
                //页面搜索栏
                //接口地址
                action: this.iaction,
                //提交方式
                method: this.imethod,
                params:this.iparams
            }
        },
        created() {
            //   获取表格数据
        this.viewTable.data = this._getViewTableData(this.action,this.method,this.params); 
        },
        methods: {
            _getViewTableData(){
                return  [
                {
                date: "2016-05-03",
                name: "王小虎",
                province: "上海",
                city: "普陀区",
                address: "上海市普陀区金沙江路 1518 弄",
                zip: 200333
                },
                {
                date: "2016-05-02",
                name: "王小虎",
                province: "上海",
                city: "普陀区",
                address: "上海市普陀区金沙江路 1518 弄",
                zip: 200333
                },
                {
                date: "2016-05-04",
                name: "王小虎",
                province: "上海",
                city: "普陀区",
                address: "上海市普陀区金沙江路 1518 弄",
                zip: 200333
                },
                {
                date: "2016-05-01",
                name: "王小虎",
                province: "上海",
                city: "普陀区",
                address: "上海市普陀区金沙江路 1518 弄",
                zip: 200333
                }
            ]
            },
        },
        /**
         * @function () getViewTableData(path,type,params)
         * @description 查询表格数据
         * @param {String} path 地址
         * @param {String} type 提交方式
         * @param {Object} params 传参
         * @returns {function} axios.post()||axios.get()
         */
        getViewTableData(path,type,params){
            if (type=="get") {
                axios.get(path,params)
                    .then(function(data){return data.data;})
                    .catch(function(error){this.showAlert(error);});
            }else if(type=="post"){
                axios.post(path,params)
                    .then(function(data){return data.data;})
                    .catch(function(error){this.showAlert(error);});
            }
        },
        filters: {
            //   转换key为中文显示名
            keyToCN(key){
                //中英参照   *need
                var tableKeys = [
                    {
                        key:"name",
                        cn:"姓名"
                    }
                ];
                for (var index = 0; index < tableKeys.length; index++) {
                    var element = tableKeys[index];
                    console.log(element)
                    if (element.key == key) {
                        return element.cn;
                    }
                }
                return key;
            }
        }
    }
</script>