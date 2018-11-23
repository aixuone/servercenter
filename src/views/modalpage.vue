<template>
    <div id="app">
        <el-breadcrumb>
            <el-breadcrumb-item>菜单</el-breadcrumb-item>
            <el-breadcrumb-item>菜单</el-breadcrumb-item>
            <el-breadcrumb-item>菜单</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form inline :model="viewSearch.data" label-position="right" label-width="120px" class="query-form">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="viewSearch.data.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="日期" prop="date">
                <el-date-picker v-model="viewSearch.data.date" type="daterange" placeholder="请输入">
                </el-date-picker>
            </el-form-item>

            <el-form-item>
                <el-button>搜索</el-button>
                <el-button type="info" @click="">更多搜索</el-button>
                <el-button type="primary" @click="handleAdd()">添加</el-button>
            </el-form-item>
        </el-form>
        <div class="viewTableClass">
            <el-table :data="viewTable.data" border stripe>
                <el-table-column v-for="(item,index) in viewTable.data[0]" :key="index" :prop="index" :label="index|keyToCN" width="150">
                </el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="success" size="small" @click="handleEdit(scope.row,scope.$index)">修改</el-button>
                        <el-button type="danger" size="small" @click="handleDelet(scope.row,scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
<!-- 对话框区 开始 -->
        <!-- 更多搜索弹框 -->
        <el-dialog title="更多搜索" :visible.sync="viewSearch.show" width="30%" id="viewSearch">
            <el-form :model="viewSearch.data" label-position="right" label-width="120px">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="viewSearch.data.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="日期" prop="date">
                    <el-date-picker
                        v-model="viewSearch.data.date"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="省份" prop="province">
                    <el-select v-model="viewSearch.data.province" placeholder="请选择">
                        <el-option
                        v-for="item in plugs.select1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="市级" prop="city">
                    <el-select v-model="viewSearch.data.city" placeholder="请选择">
                        <el-option
                        v-for="item in plugs.select2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input v-model="viewSearch.data.address" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="邮编" prop="zip">
                    <el-input v-model="viewSearch.data.zip" placeholder="请输入"></el-input>
                </el-form-item>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="viewSearch.show = false">取消</el-button>
                <el-button type="info" @click="editSingle()">确定</el-button>
            </div>
        </el-dialog>
        <!-- 新增 -->
        <el-dialog title="新增" :visible.sync="viewAdd.show" width="30%" id="viewAdd">
            <el-form :model="viewAdd.data" label-position="right" label-width="120px">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="viewAdd.item.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="日期" prop="date">
                    <el-date-picker
                        v-model="viewAdd.item.date"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="省份" prop="province">
                    <el-select v-model="viewAdd.item.province" placeholder="请选择">
                        <el-option
                        v-for="item in plugs.select1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="市级" prop="city">
                    <el-select v-model="viewAdd.item.city" placeholder="请选择">
                        <el-option
                        v-for="item in plugs.select2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input v-model="viewAdd.item.address" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="邮编" prop="zip">
                    <el-input v-model="viewAdd.item.zip" placeholder="请输入"></el-input>
                </el-form-item>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="viewAdd.show = false">取消</el-button>
                <el-button type="info" @click="addSingle()">确定</el-button>
            </div>
        </el-dialog>
        <!-- 修改 -->
        <el-dialog title="修改" :visible.sync="viewEdit.show" width="30%" id="viewEdit">
            <el-form :model="viewEdit.data" label-position="right" label-width="120px">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="viewEdit.data.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="日期" prop="date">
                    <el-date-picker
                        v-model="viewEdit.data.date"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="省份" prop="province">
                    <el-select v-model="viewEdit.data.province" placeholder="请选择">
                        <el-option
                        v-for="item in plugs.select1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="市级" prop="city">
                    <el-select v-model="viewEdit.data.city" placeholder="请选择">
                        <el-option
                        v-for="item in plugs.select2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input v-model="viewEdit.data.address" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="邮编" prop="zip">
                    <el-input v-model="viewEdit.data.zip" placeholder="请输入"></el-input>
                </el-form-item>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="viewEdit.show = false">取消</el-button>
                <el-button type="info" @click="editSingle()">确定</el-button>
            </div>
        </el-dialog>
        <!-- 删除 -->
        <el-dialog title="删除" :visible.sync="viewDelet.show" width="30%" id="viewDelet">
            <div class="modal-body">
                确定删除吗?
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="viewDelet.show = false">取消</el-button>
                <el-button type="info" @click="deletSingle()">确定</el-button>
            </div>
        </el-dialog>
<!-- 对话框 结束 -->
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "modalpage",
  components: {},
  data() {
    return {
      //模版版本号
      modelVersion: "0.0.0",
      //页面版本
      pageVersion: "0.0.0",
      //页面标题
      title: "页面标题",
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
      //接口信息 *need
      ajax: {
        // 查询
        Search: {
          //接口地址
          action: "",
          //提交方式
          method: "",
          // 参数
          params: {}
        },
        // 增加
        add: {
          //接口地址
          action: "",
          //提交方式
          method: "",
          // 参数
          params: {}
        },
        // 修改
        edit: {
          //接口地址
          action: "",
          //提交方式
          method: "",
          // 参数
          params: {}
        },
        // 删除
        delete: {
          //接口地址
          action: "",
          //提交方式
          method: "",
          // 参数
          params: {}
        }
      },
      //页面搜索栏
      viewSearch: {
        data: {}
      },
      //数据新增功能
      viewAdd: {
        item: {
          data: "",
          name: "",
          province: "",
          city: "",
          address: "",
          zip: ""
        },
        show: false
      },
      //数据修改功能
      viewEdit: {
        index: "",
        data: "",
        show: false
      },
      //数据删除功能
      viewDelet: {
        show: false,
        item: {},
        index: ""
      },
      plugs:{
          select1:[{label:"上海",value:"上海"},{label:"北京",value:"北京"},{label:"重庆",value:"重庆"}],
          select2:[{label:"某区",value:"某区"},{label:"某市",value:"某市"},{label:"某某市",value:"某某市"}]
      }
    };
  },
  created() {
    //   获取表格数据
    axios.get(
      this.ajax.Search.action,
      this.ajax.Search.params
    ).then(res=>{
        if(res.success=='true'){this.viewTable.data = res.data;}
        else{console.log(res.message);}
        })
    .catch(err=>{console.log(err);});
  },
  methods: {
    _getViewTableData() {
      return [
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
      ];
    },
    //表格操作
    /**
     * @function () handleEdit(item)
     * @description 表格 修改弹窗
     * @param {Object} item 表格一行数据
     * @param {String} index 数据第几项
     */
    handleEdit(item, index) {
      console.log("edit", item,index);
      this.viewEdit.data = Object.assign({}, item);
      this.viewEdit.index = index;
      this.viewEdit.show = true;
    },
    /**
     * @function () editSingle()
     * @description 修改单项
     */
    editSingle() {
      this.$set(this.viewTable.data,this.viewEdit.index,this.viewEdit.data);
      this.viewEdit.show = false;
    },
    /**
     * @function () handleDelet(item)
     * @description 表格 修改数据
     * @param {Object} item 表格一行数据
     */
    handleDelet(item, index) {
      console.log("delet", item);
      this.viewDelet.item = item;
      this.viewDelet.index = index;
      this.viewDelet.show = true;
    },
    /**
     * @function () deleteSingle()
     * @description 删除单项
     */
    deletSingle() {
      this.viewTable.data.splice(this.viewDelet.index, 1);
      this.viewDelet.show = false;
    },

    /**
     * @function () handleDelet(item)
     * @description 表格 修改数据
     * @param {Object} item 表格一行数据
     */
    handleAdd(item) {
      console.log("添加新成员");
      this.viewAdd.show = true;
    },
    /**
     * @function () addeSingle()
     * @description 添加单项
     */
    addSingle() {
      var o = Object.assign({}, this.viewAdd.item);
      this.viewTable.data.push(o);
      for (var i in this.viewAdd.item) {
        this.viewAdd.item[i] = "";
      }
      this.viewAdd.show = false;
    }
  },
  filters: {
    //   转换key为中文显示名
    keyToCN(key) {
      //中英参照   *need
      var tableKeys = [
        {
          key: "name",
          cn: "姓名"
        }
      ];
      for (var index = 0; index < tableKeys.length; index++) {
        var element = tableKeys[index];
        if (element.key == key) {
          return element.cn;
        }
      }
      return key;
    }
  }
};
</script>
