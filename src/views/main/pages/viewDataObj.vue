<template>
  <div class="resource">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <div class="breadxian"></div>
      <el-breadcrumb-item>{{headerTitle}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="breadbottom"></div>
    <br>
    <p>
      <el-button
        type="primary"
        @click="handleAdd()"
      >添加</el-button>
    </p>
    <br>
    <div class="viewTableClass">
      <el-table
        :data="viewTable.data"
        border
        :header-cell-style="{background:'#f9fafc'}"
        height="100%"
      >
        <el-table-column prop="id" label="ID" width="50" fixed></el-table-column>
        <el-table-column prop="columnName" label="字段名" width="100"></el-table-column>
        <el-table-column prop="jdbcType" label="数据类型" width="100"></el-table-column>
        <el-table-column prop="length" label="数据长度" width="100"></el-table-column>
        <el-table-column prop="name" label="属性名" width="100"></el-table-column>
        <el-table-column prop="description" label="说明"></el-table-column>
        <el-table-column prop="type" label="类型" width="100"></el-table-column>
        <el-table-column label="引用字典信息" align="center">
          <el-table-column prop="dicRes" label="字典对象"></el-table-column>
          <el-table-column prop="dicKey" label="字典KEY" width="100"></el-table-column>
          <el-table-column prop="dicValue" label="字典VALUE" width="100"></el-table-column>
        </el-table-column>
        <el-table-column prop="isNull" label="是否为空" :formatter="nullFilter"></el-table-column>
        <el-table-column prop="indexType" label="索引类型" width="100"></el-table-column>
        <el-table-column prop="isKey" label="是否唯一键" :formatter="keyFilter"></el-table-column>
        <!-- <el-table-column prop="isIncrement" label="自增序列" width="100" :formatter="incrementFilter"></el-table-column> -->
        <el-table-column label="操作" width="200" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="handleEdit(scope.row,scope.$index)"
            >修改</el-button>
            <el-button
              type="danger"
              size="small"
              @click="handleDelet(scope.row,scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 对话框区 开始 -->
    <!-- 新增 -->
    <el-dialog
      title="添加数据对象属性"
      :visible.sync="viewAdd.show"
      @close="closeDialog"
      :close-on-click-modal="false"
      width="30%"
      id="viewAdd"
    >
      <el-form
        :model="viewAdd.data"
        :rules="addrules"
        ref="addform"
        label-position="right"
        label-width="120px"
      >
        <el-form-item label="字段名：" prop="columnName">
          <el-input v-model="viewAdd.data.columnName" placeholder="请输入字段名" @change="setAddName"></el-input>
        </el-form-item>
        <el-form-item
          label="数据类型："
          prop="jdbcType"
        >
          <el-select
            v-model="viewAdd.data.jdbcType"
            placeholder="请选择"
          >
            <el-option
              v-for="item in plugs.select1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="数据长度："
          prop="length"
        >
          <el-input
            v-model="viewAdd.data.length"
            placeholder="请输入数据长度"
          ></el-input>
        </el-form-item>
        <el-form-item label="属性名：" prop="name">
          <el-input v-model="viewAdd.data.name" placeholder="请输入属性名"></el-input>
        </el-form-item>
        <el-form-item label="说明：">
          <el-input
            v-model="viewAdd.data.description"
            placeholder="请输入说明"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="类型："
          prop="type"
        >
          <el-select
            v-model="viewAdd.data.type"
            placeholder="请选择"
          >
            <el-option
              v-for="item in plugs.select2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="引用字典对象：">
          <el-select v-model="viewAdd.data.dicRes" placeholder="请选择" @change="getDicAttrs">
            <el-option
              v-for="item in plugs.select3"
              :key="item.id"
              :label="item.description"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="字典KEY：" prop="dicKey">
          <el-select v-model="viewAdd.data.dicKey" placeholder="请选择">
            <el-option
              v-for="item in plugs.select4"
              :key="item.id"
              :label="item.description"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="字典VALUE：" prop="dicValue">
          <el-select v-model="viewAdd.data.dicValue" placeholder="请选择">
            <el-option
              v-for="item in plugs.select4"
              :key="item.id"
              :label="item.description"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规则：">
          <el-input
            v-model="viewAdd.data.rule"
            placeholder="请输入规则"
          ></el-input>
        </el-form-item>

        <el-form-item label="索引类型：">
          <el-select v-model="viewAdd.data.indexType" placeholder="请选择">
            <el-option label="--" value="--"></el-option>
            <el-option label="唯一键" value="唯一键"></el-option>
            <el-option label="索引" value="索引"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否为空：" v-show="viewAdd.data.indexType!='唯一键'">
          <template>
            <el-radio
              v-model="viewAdd.data.isNull"
              label="true"
            >是</el-radio>
            <el-radio
              v-model="viewAdd.data.isNull"
              label="false"
            >否</el-radio>
          </template>
        </el-form-item>
        <!--<el-form-item label="自增序列：" v-show="viewAdd.data.indexType=='唯一键'">
          <template>
            <el-radio
              v-model="viewAdd.data.isIncrement"
              label="true"
            >是</el-radio>
            <el-radio
              v-model="viewAdd.data.isIncrement"
              label="false"
            >否</el-radio>
          </template>
        </el-form-item>-->
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="danger"
          @click="addCancel()"
        >取消</el-button>
        <el-button
          type="primary"
          @click="addSingle()"
        >确定</el-button>
      </div>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog title="修改数据对象属性" :visible.sync="viewEdit.show" width="30%" id="viewEdit">
      <el-form :model="viewEdit.data" label-position="right" label-width="120px">
        <el-form-item label="字段名：">
          <el-input v-model="viewEdit.data.columnName" placeholder="请输入字段名" @change="setEditName"></el-input>
        </el-form-item>
        <el-form-item label="数据类型：">
          <el-select
            v-model="viewEdit.data.jdbcType"
            placeholder="请选择"
          >
            <el-option
              v-for="item in plugs.select1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据长度：">
          <el-input
            v-model="viewEdit.data.length"
            placeholder="请输入数据长度"
          ></el-input>
        </el-form-item>
        <el-form-item label="属性名：" prop="name">
          <el-input v-model="viewEdit.data.name" placeholder="请输入属性名"></el-input>
        </el-form-item>
        <el-form-item label="说明：">
          <el-input
            v-model="viewEdit.data.description"
            placeholder="请输入说明"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型：">
          <el-select
            v-model="viewEdit.data.type"
            placeholder="请选择"
          >
            <el-option
              v-for="item in plugs.select2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="引用字典对象：" prop="dicRes">
          <el-select v-model="viewEdit.data.dicRes" placeholder="请选择" @change="getDicAttrs">
            <el-option
              v-for="item in plugs.select3"
              :key="item.id"
              :label="item.description"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="字典KEY：" prop="dicKey">
          <el-select v-model="viewEdit.data.dicKey" placeholder="请选择">
            <el-option
              v-for="item in plugs.select4"
              :key="item.id"
              :label="item.description"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="字典VALUE：" prop="dicValue">
          <el-select v-model="viewEdit.data.dicValue" placeholder="请选择">
            <el-option
              v-for="item in plugs.select4"
              :key="item.id"
              :label="item.description"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规则：">
          <el-input
            v-model="viewEdit.data.rule"
            placeholder="请输入规则"
          ></el-input>
        </el-form-item>
        <el-form-item label="索引类型：" prop="indexType">
          <el-select v-model="viewEdit.data.indexType" placeholder="请选择" @change="indexChange">
            <el-option label="--" value="--"></el-option>
            <el-option label="唯一键" value="唯一键"></el-option>
            <el-option label="索引" value="索引"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否为空：" prop="isNull" v-show="viewEdit.data.indexType!='唯一键'">
          <template>
            <el-radio
              v-model="viewEdit.data.isNull"
              label="true"
            >是</el-radio>
            <el-radio
              v-model="viewEdit.data.isNull"
              label="false"
            >否</el-radio>
          </template>
        </el-form-item>
        <!-- <el-form-item label="自增序列：" prop="isIncrement" v-show="viewEdit.data.indexType=='唯一键'">
          <template>
            <el-radio
              v-model="viewEdit.data.isIncrement"
              label="true"
            >是</el-radio>
            <el-radio
              v-model="viewEdit.data.isIncrement"
              label="false"
            >否</el-radio>
          </template>
        </el-form-item> -->
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="danger"
          @click="editCancel()"
        >取消</el-button>
        <el-button
          type="primary"
          @click="editSingle()"
        >确定</el-button>
      </div>
    </el-dialog>
    <!-- 删除 -->
    <el-dialog
      title="删除"
      :visible.sync="viewDelet.show"
      width="30%"
      id="viewDelet"
    >
      <div class="modal-body">您确定删除要删除该项吗?</div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="danger"
          @click="viewDelet.show = false"
        >取消</el-button>
        <el-button
          type="primary"
          @click="deletSingle()"
        >确定</el-button>
      </div>
    </el-dialog>
    <!-- 对话框 结束 
    <div style="width:100%;position:absolute;bottom:0px;left:0%;text-align:center;">
      <dictBindAttr :resId="resId"></dictBindAttr>
    </div>-->
  </div>
</template>

<script>
import axios from "@/libs/axios";
import api from "@/api/data-model/data";
import { Message } from "element-ui";
import dictBindAttr from "./dictBindAttr";
export default {
  name: "viewDataObj",
  components: {
    dictBindAttr
  },
  data() {
    //字段名的验证
    var columnNames = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("字段名不能为空"));
      }
      if (value) {
        setTimeout(() => {
          var reg = /^[a-zA-Z]\w{0,19}$/;
          if (!reg.test(value)) {
            callback(
              new Error(
                "有效的字段名为第一个必须是字母，后面可以是字母、数字、下划线，总长度为5-20！"
              )
            );
          } else {
            callback();
          }
        }, 500);
      }
    };
    //数据的长度
    var lengths = (rule, value, callback) => {
      console.log(11, rule);
      if (!value) {
        return callback(new Error("数据长度不能为空"));
      }
      setTimeout(() => {
        var reg = /^[1-9]\d*$/;
        if (!reg.test(value)) {
          callback(new Error("数据长度为大于0的正整数"));
        } else {
          callback();
        }
      }, 1000);
    };
    //数据的名称
    var chineses = (rule, value, callback) => {
      console.log(11, rule);
      if (!value) {
        return callback(new Error("名称不能为空"));
      }
      setTimeout(() => {
        var reg = /^[\u4e00-\u9fa5]+$/;
        if (!reg.test(value)) {
          callback(new Error("名字应为中文"));
        } else {
          callback();
        }
      }, 1000);
    };

    return {
      // booleans:true, //按钮的禁用和不禁用状态
      headerTitle: "对象属性列表",
      resId: "",
      //组件dict 显示
      viewDict: true,
      //页面表格
      viewTable: {
        //dom元素id
        domId: "",
        //样式表类名
        className: "",
        //数据
        data: []
      },
      //数据新增功能
      viewAdd: {
        data: {
          isIncrement: "false",
          isNull: "true",
          indexType: "--",
          columnName: "",
          jdbcType: "",
          length: "",
          name: "",
          type: ""
        },
        show: false
      },
      //数据修改功能
      viewEdit: {
        index: "",
        data: {
          isIncrement: "",
          isNull: "",
          indexType: ""
        },
        show: false
      },
      //数据删除功能
      viewDelet: {
        show: false,
        data: {},
        index: ""
      },
      plugs: {
        select1: [
          { label: "varchar", value: "varchar" },
          { label: "integer", value: "integer" },
          { label: "double", value: "double" },
          { label: "float", value: "float" },
          { label: "datetime", value: "datetime" },
          { label: "bigint", value: "bigint" },
          { label: "char", value: "char" },
          { label: "tinyint", value: "tinyint" },
          { label: "smallint", value: "smallint" },
          { label: "mediumint", value: "mediumint" },
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
          { label: "文本", value: "文本" },
          { label: "数字", value: "数字" },
          { label: "字典", value: "字典" },
          { label: "邮箱", value: "邮箱" },
          { label: "手机号", value: "手机号" },
          { label: "身份证", value: "身份证" }
        ],
        select3: [{ label: "查询列表失败", value: "" }],
        select4: []
      },
      //新增的表单的验证
      addrules: {
        columnName: [
          { required: true, validator: columnNames, trigger: "blur" }
        ],
        jdbcType: [
          { required: true, message: "请选择数据类型", trigger: "change" }
        ],
        length: [{ required: true, validator: lengths, trigger: "blur" }],
        name: [{ required: true, trigger: "blur" }],
        type: [{ required: true, message: "请选择类型", trigger: "change" }]
      }
    };
  },
  created() {
    this.resId = parseInt(this.$route.path.split("/")[3]);
    this.handleSearch();
    this.getDics();
  },
  methods: {
    //   获取字典列表
    getDics() {
      api
        .getDataObjectsList({
          type: "",
          isDic: "true",
          name: "",
          pageInfo: {
            page: 0,
            pageSize: 0
          }
        })
        .then(res => {
          if (res.success) {
            this.plugs.select3 = res.data.list;
          } else {
            Message.error("获取字典列表失败。");
          }
        })
        .catch(error => {
          console.log(error);
          Message.error("网络错误。" + error);
        });
    },
    getDicAttrs(resId) {
      api
        .getDataObjectAttrsList({
          resId: resId,
          pageInfo: {
            page: 0,
            pageSize: 0
          }
        })
        .then(res => {
          this.plugs.select4 = res.data.list;
        })
        .catch(error => {
          console.log(error);
          Message.error("获取对象列表失败。", error);
        });
    },
    //获取表格数据
    handleSearch() {
        this.viewDict = false
        this.$nextTick(() => {
        this.viewDict = true
        })
      api
        .getDataObjectAttrsList({
          resId: this.resId,
          pageInfo: { page: 0, pageSize: 0 }
        })
        .then(res => {
          this.viewTable.data = res.data.list;
        })
        .catch(error => {
          console.log(error);
          Message.error("获取属性列表失败。", error);
        });
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
      this.viewEdit.old = Object.assign({}, item);
      this.viewEdit.data.resId = this.resId;
      this.viewEdit.index = index;
      this.viewEdit.show = true;
      if (
        this.viewEdit.data.dicRes != null &&
        this.viewEdit.data.dicRes != ""
      ) {
        this.getDicAttrs(this.viewEdit.data.dicRes);
      }
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

    /**
     * @function () editSingle()
     * @description 修改单项
     */
    editSingle() {
      if (this.diff(this.viewEdit.data, this.viewEdit.old) == true) {
        Message.warning("修改前和修改后的数据一致");
      } else {
        api
          .editDataObjectAttr(this.viewEdit.data)
          .then(res => {
            if ((res.success = true)) {
              Message.success("修改成功");
              this.handleSearch();
              this.viewEdit.show = false;
            }
          })
          .catch(error => {
            console.log(error);
            Message.error(error);
          });
      }
    },

    /**
     * @function () editCancel()
     * @description 取消
     */
    editCancel() {
      this.viewEdit.show = false;
      this.$refs["editform"].resetFields();
    },

    /**
     * @function () handleDelet(item)
     * @description 表格 修改数据
     * @param {Object} item 表格一行数据
     */
    handleDelet(item, index) {
      console.log("delet", item);
      this.viewDelet.data = item;
      this.viewDelet.data.resId = this.resId;
      this.viewDelet.index = index;
      this.viewDelet.show = true;
    },
    /**
     * @function () deleteSingle()
     * @description 删除单项
     */
    deletSingle() {
      api
        .deleteDataObjectAttr({
          id: this.viewDelet.data.id
        })
        .then(res => {
          if (res.success == true) {
            Message.success("删除成功");
            this.handleSearch();
            this.viewDelet.show = false;
          }
        })
        .catch(error => {
          console.log(error);
          Message.error(error);
        });
    },

    /**
     * @function () handleDelet(item)
     * @description 表格 修改数据
     * @param {Object} item 表格一行数据
     */
    handleAdd(item) {
      this.viewAdd.show = true;
    },
    // 对话框关闭事件
    closeDialog() {
      // 点击关闭 数据重置
      this.$refs["addform"].resetFields();
    },
    /**
     * @function () addeSingle()
     * @description 添加单项
     */
    addSingle() {
      //新增弹框的表单验证
      this.$refs["addform"].validate(valid => {
        if (valid) {
          var o = Object.assign({}, this.viewAdd.data);
          o.resId = this.resId;
          //奇怪的程序逻辑设计 start
          if (o.indexType == "唯一键") {
            o.isKey = "true";
            o.isNull = "false";
          } else {
            o.isKey = "false";
            o.isIncrement = "false";
          }
          //奇怪的程序逻辑设计 end
          var list = [];
          list[0] = o;
          api
            .addDataObjectAttr({ objectId: this.resId, list: list })
            .then(res => {
              console.log("添加", res);
              if (res.success == true) {
                Message.success("添加成功");
                this.handleSearch();
                //清除新建窗口信息
                for (var i in this.viewAdd.data) {
                  this.viewAdd.data[i] = "";
                }
                this.viewAdd.data.isIncrement = false;
                this.viewAdd.data.isNull = true;
                this.viewAdd.show = false;
              } else {
                Message.error("添加失败。");
              }
            })
            .catch(error => {
              console.log(error);
              Message.error(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    /**
     * @function () addCancel()
     * @description 新增弹框取消
     */
    addCancel() {
      this.viewAdd.show = false;
      this.$refs["addform"].resetFields();
    },
    //是否为空 过滤器 改 t/f 为  是/否
    nullFilter(bool) {
      return bool.isNull == "true"
        ? "是"
        : bool.isNull == "false"
        ? "否"
        : "未知";
    },
    //是否唯一键 过滤器 改 t/f 为  是/否
    keyFilter(bool) {
      return bool.isKey == "true"
        ? "是"
        : bool.isKey == "false"
        ? "否"
        : "未知";
    },
    //自增序列 过滤器
    incrementFilter(bool) {
      return bool.isIncrement == "true"
        ? "是"
        : bool.isIncrement == "false"
        ? "否"
        : "未知";
    },
    //同步更新实体属性名
    setEditName(value){
      this.viewEdit.data.name=value;
    },
    //同步更新实体属性名
    setAddName(value){
      this.viewAdd.data.name=value;
    },
    indexChange(value) {
      //奇怪的程序逻辑设计 start
      if (value == "唯一键") {
        this.viewEdit.data.isKey = "true";
        this.viewEdit.data.isNull = "false";
      } else {
        this.viewEdit.data.isKey = "false";
        this.viewEdit.data.isIncrement = "false";
      }
    }
  }
};
</script>
