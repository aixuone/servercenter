<template>
    <div>
        <br>
        <p>
            <el-button type="primary" @click="handleAdd()">添加</el-button>
        </p>
        <br>
        <div class="viewTableClass">
            <el-table :data="viewTable.data" border :header-cell-style="{background:'#f9fafc'}">
                <el-table-column prop="id" label="ID" width="100"></el-table-column>
                <el-table-column prop="columnName" label="字段名" width="100"></el-table-column>
                <el-table-column prop="jdbcType" label="数据类型" width="100"></el-table-column>
                <el-table-column prop="length" label="数据长度" width="100"></el-table-column>
                <el-table-column prop="name" label="名称" width="100"></el-table-column>
                <el-table-column prop="description" label="说明"></el-table-column>
                <el-table-column prop="type" label="类型" width="100"></el-table-column>
                <el-table-column prop="disRes" label="引用字典对象" ></el-table-column>
                <el-table-column prop="rule" label="规则" width="100"></el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="handleEdit(scope.row,scope.$index)">修改</el-button>
                        <el-button type="danger" size="small" @click="handleDelet(scope.row,scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </div>
        <!-- 对话框区 开始 -->
        <!-- 新增 -->
        <el-dialog title="添加数据集属性" :visible.sync="viewAdd.show" width="30%" id="viewAdd">            
            <el-form :model="viewAdd.data" label-position="right" label-width="120px">
                <selectObjAttr></selectObjAttr>                         
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="danger" @click="viewAdd.show = false">取消</el-button>
                <el-button type="primary" @click="addSingle()">确定</el-button>
            </div>
        </el-dialog>
        <!-- 修改 -->
        <el-dialog title="修改数据集属性" :visible.sync="viewEdit.show" width="30%" id="viewEdit">
            <el-form :model="viewEdit.data" label-position="right" label-width="120px">
                <el-form-item label="字段名：">
                    <el-input v-model="viewEdit.data.columnName" placeholder="请输入字段名"></el-input>
                </el-form-item>
                <el-form-item label="数据类型：">
                    <el-select v-model="viewEdit.data.jdbcType" placeholder="请选择">
                        <el-option v-for="item in plugs.select1" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="数据长度：">
                    <el-input v-model="viewEdit.data.length" placeholder="请输入数据长度"></el-input>
                    
                </el-form-item>
                <el-form-item label="名称：">
                    <el-input v-model="viewEdit.data.name" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item label="说明：">
                    <el-input v-model="viewEdit.data.description" placeholder="请输入说明"></el-input>
                </el-form-item>
                <el-form-item label="类型：">
                   <el-select v-model="viewEdit.data.type" placeholder="请选择">
                        <el-option v-for="item in plugs.select2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="引用字典对象：">
                    <el-select v-model="viewEdit.data.disRes" placeholder="请选择">
                        <el-option v-for="item in plugs.select3"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="规则：" >
                    <el-input v-model="viewEdit.data.rule" placeholder="请输入规则"></el-input>
                </el-form-item>                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="danger" @click="viewEdit.show = false">取消</el-button>
                <el-button type="primary" @click="editSingle()">确定</el-button>
            </div>
        </el-dialog>
        <!-- 删除 -->
        <el-dialog title="删除" :visible.sync="viewDelet.show" width="30%" id="viewDelet">
            <div class="modal-body">
                您确定删除要删除该项吗?
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="danger" @click="viewDelet.show = false">取消</el-button>
                <el-button type="primary" @click="deletSingle()">确定</el-button>
            </div>
        </el-dialog>
        <!-- 对话框 结束 -->
    </div>
</template>

<script>
import api from "@/api/data-model/data";
import selectObjAttr from "./../components/plug_select_objAttr";
export default {
  name: "viewdataset",
  components: {selectObjAttr},
  data() {
    return {
      //数据对象
      dataObject:{
          id:"", //主键
          name:"" //中文名称
      },
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
      //数据新增功能
      viewAdd: {
        data: {
            list1:[],
            list2:[]
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
          rule: "文本说明"
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
          rule: "文本说明"
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
