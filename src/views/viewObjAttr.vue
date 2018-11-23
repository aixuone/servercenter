<template>
    <div id="app">
        <br>
        <p>
            <el-button type="primary" @click="handleAdd()">添加</el-button>
        </p>
        <br>
        <div class="viewTableClass">
            <el-table :data="viewTable.data" border :header-cell-style="{background:'#f9fafc'}">
                <el-table-column v-for="(item,index) in viewTable.data[0]" :key="index" :prop="index" :label="index|lang" width="150">
                </el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="handleEdit(scope.row,scope.$index)">修改</el-button>
                        <el-button type="danger" size="small" @click="handleDelet(scope.row,scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </div>
        <!-- 对话框区 开始 -->
        <!-- 新增 -->
        <el-dialog title="新增" :visible.sync="viewAdd.show" width="30%" id="viewAdd">            
            <el-form :model="viewAdd.data" label-position="right" label-width="120px">
                <el-form-item label="字段名：">
                    <el-input v-model="viewAdd.data.b" placeholder="请输入字段名"></el-input>
                </el-form-item>
                <el-form-item label="数据类型：">
                    <el-select v-model="viewAdd.data.c" placeholder="请选择">
                        <el-option v-for="item in plugs.select1" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="数据长度：">
                    <el-input v-model="viewAdd.data.d" placeholder="请输入数据长度"></el-input>
                    
                </el-form-item>
                <el-form-item label="名称：">
                    <el-input v-model="viewAdd.data.e" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item label="说明：">
                    <el-input v-model="viewAdd.data.f" placeholder="请输入说明"></el-input>
                </el-form-item>
                <el-form-item label="类型：">
                   <el-select v-model="viewAdd.data.g" placeholder="请选择">
                        <el-option v-for="item in plugs.select2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="引用字典对象：">
                    <el-select v-model="viewAdd.data.h" placeholder="请选择">
                        <el-option v-for="item in plugs.select3"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="规则：" >
                    <el-input v-model="viewAdd.data.i" placeholder="请输入规则"></el-input>
                </el-form-item>                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="viewAdd.show = false">取消</el-button>
                <el-button type="primary" @click="addSingle()">确定</el-button>
            </div>
        </el-dialog>
        <!-- 修改 -->
        <el-dialog title="修改" :visible.sync="viewEdit.show" width="30%" id="viewEdit">
            <el-form :model="viewEdit.data" label-position="right" label-width="120px">
                <el-form-item label="字段名：">
                    <el-input v-model="viewEdit.data.b" placeholder="请输入字段名"></el-input>
                </el-form-item>
                <el-form-item label="数据类型：">
                    <el-select v-model="viewEdit.data.c" placeholder="请选择">
                        <el-option v-for="item in plugs.select1" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="数据长度：">
                    <el-input v-model="viewEdit.data.d" placeholder="请输入数据长度"></el-input>
                    
                </el-form-item>
                <el-form-item label="名称：">
                    <el-input v-model="viewEdit.data.e" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item label="说明：">
                    <el-input v-model="viewEdit.data.f" placeholder="请输入说明"></el-input>
                </el-form-item>
                <el-form-item label="类型：">
                   <el-select v-model="viewEdit.data.g" placeholder="请选择">
                        <el-option v-for="item in plugs.select2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="引用字典对象：">
                    <el-select v-model="viewEdit.data.h" placeholder="请选择">
                        <el-option v-for="item in plugs.select3"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="规则：" >
                    <el-input v-model="viewEdit.data.i" placeholder="请输入规则"></el-input>
                </el-form-item>                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="viewEdit.show = false">取消</el-button>
                <el-button type="primary" @click="editSingle()">确定</el-button>
            </div>
        </el-dialog>
        <!-- 删除 -->
        <el-dialog title="删除" :visible.sync="viewDelet.show" width="30%" id="viewDelet">
            <div class="modal-body">
                您确定删除要删除该项吗?
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="viewDelet.show = false">取消</el-button>
                <el-button type="primary" @click="deletSingle()">确定</el-button>
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
      //数据新增功能
      viewAdd: {
        data: {
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
      plugs: {
        select1: [
          { label: "vchar", value: "vchar" },
          { label: "char", value: "char" },
          { label: "tinyint", value: "tinyint" },
          { label: "smallint", value: "smallint" },
          { label: "mediumint", value: "mediumint" },
          { label: "integer", value: "integer" },
          { label: "bigint", value: "bigint" },
          { label: "float", value: "float" },
          { label: "double", value: "double" },
          { label: "decimal", value: "decimal" },
          { label: "tinytext", value: "tinytext" },
          { label: "text", value: "text" },
          { label: "mediumtext", value: "mediumtext" },
          { label: "longtext", value: "longtext" },
          { label: "tinyblog", value: "tinyblog" },
          { label: "blog", value: "blog" },
          { label: "mediumblog", value: "mediumblog" },
          { label: "longblog", value: "longblog" }
        ],
        select2: [
          { label: "字典", value: "字典" },
          { label: "邮箱", value: "邮箱" },
          { label: "手机号", value: "手机号" },
          { label: "文本", value: "文本" },
          { label: "数字", value: "数字" },
          { label: "身份证", value: "身份证" }
        ],
        select3:[
          { label: "PC56-7", value: "PC56-7" },
          { label: "AS56-2", value: "AS56-2" },
          { label: "DS56-3", value: "DS56-3" },
          { label: "SD56-1", value: "SD56-1" },
          { label: "PZ56-2", value: "PZ56-2" },
          { label: "PC56-4", value: "PC56-4" }
        ]
      }
    };
  },
  created() {
    //   获取表格数据
    // this.viewTable.data = this.getViewTableData(
    //   this.ajax.Search.action,
    //   this.ajax.Search.method,
    //   this.ajax.Search.params
    // );
    this.viewTable.data = this._getViewTableData();
  },
  methods: {
    _getViewTableData() {
      return [
        {
          a: "1",
          b: "model",
          c: "vchar",
          d: "50",
          e: "机型",
          f: "出厂型号",
          g: "字典",
          h: "pc56-7",
          i: "文本说明"
        },
        {
          a: "2",
          b: "key",
          c: "int",
          d: "10",
          e: "启动",
          f: "启动装置",
          g: "文本",
          h: "pc56-7",
          i: "文本说明"
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
      console.log("edit", item, index);
      this.viewEdit.data = Object.assign({}, item);
      this.viewEdit.index = index;
      this.viewEdit.show = true;
    },
    /**
     * @function () editSingle()
     * @description 修改单项
     */
    editSingle() {
      this.$set(this.viewTable.data, this.viewEdit.index, this.viewEdit.data);
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
      var o = Object.assign({}, this.viewAdd.data);
      this.viewTable.data.push(o);
      for (var i in this.viewAdd.data) {
        this.viewAdd.data[i] = "";
      }
      this.viewAdd.show = false;
    }
  },
  filters: {
    //   转换key为中文显示名
    lang(key) {
      //中英参照   *need
      var tableKeys = [
        {
          key: "a",
          name: "ID"
        },
        {
          key: "b",
          name: "字段名"
        },
        {
          key: "c",
          name: "数据类型"
        },
        {
          key: "d",
          name: "数据长度"
        },
        {
          key: "e",
          name: "名称"
        },
        {
          key: "f",
          name: "说明"
        },
        {
          key: "g",
          name: "类型"
        },
        {
          key: "h",
          name: "引用字典对象"
        },
        {
          key: "i",
          name: "规则"
        }
      ];
      for (var index = 0; index < tableKeys.length; index++) {
        var element = tableKeys[index];
        if (element.key == key) {
          return element.name;
        }
      }
      return key;
    }
  }
};
</script>
