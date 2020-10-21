<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <div class="breadxian"></div>
      <el-breadcrumb-item>{{headerTitle}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="breadbottom"></div>
    <br>
    <!-- 搜索 -->
    <el-form inline :model="viewSearch" label-position="right" label-width="80px">
      <div style="display:inline-block;">
        <div v-for="(item,index) in viewSearch.data" :key="index">
          <el-form-item label="字段" width="100">
            <el-select v-model="item.key" placeholder="请选择">
              <el-option v-for="(i,j) in attrs" :key="j" :label="i.description" :value="i.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="item.condition" placeholder="符号" class="form-small-width">
              <el-option label=">" value="greate than"></el-option>
              <el-option label=">=" value="greate than equals"></el-option>
              <el-option label="=" value="equals"></el-option>
              <el-option label="<" value="less than"></el-option>
              <el-option label="<=" value="less than equals"></el-option>
              <el-option label="like" value="like"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="item.value" placeholder="输入名称/说明关键词"></el-input>
          </el-form-item>
          <i
            class="fa fa-minus-circle"
            @click="handleDelThis(index)"
            style="font-size:20px,color:red"
          ></i>
        </div>
      </div>
      <el-form-item>
        <i class="fa fa-plus-circle" @click="handleAddSer()" style="font-size:30px"></i>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getTableData()">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleAdd()">添加</el-button>
      </el-form-item>
    </el-form>
    <br>
    <div class="viewTableClass" style="height:500px;">
      <el-table
        :data="viewTable.data"
        border
        :header-cell-style="{background:'#f9fafc'}"
        height="100%"
      >
        <el-table-column type="index" width="100"></el-table-column>

        <el-table-column
          v-for="(item,index) in attrsIncludeDic"
          :key="index"
          :prop="item.name"
          :label="item.description"
          width="150px"
        ></el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row,scope.$index)">修改</el-button>
            <el-button type="danger" size="small" @click="handleDelet(scope.row,scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <el-pagination
      class="pageArea"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="viewTable.pageInfo.page"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="viewTable.pageInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="viewTable.pageInfo.total"
    ></el-pagination>
    <!-- 对话框开始 -->
    <!-- 新增 -->
    <el-dialog
      title="添加数据"
      :visible.sync="viewAdd.show"
      @close="closeDialog"
      :close-on-click-modal="false"
      width="30%"
      id="viewAdd"
    >
      <el-form
        :model="viewAdd.data"
        ref="addform"
        label-position="right"
        label-width="120px"
      >
        <el-form-item
          v-for="(item,index) in attrsIncludeDic"
          :key="index"
          :label="item.description"
          :prop="item.name"
        >
          <el-input
            v-if="item.dicRes==-1 && item.type=='文本'"
            v-model="viewAdd.data[item.name]"
            placeholder="请输入..."
          ></el-input>
          <el-input-number
            v-if="item.dicRes==-1 && item.type=='数字'"
            v-model="viewAdd.data[item.name]"
            :min="-1"
            placeholder="请输入..."
          ></el-input-number>
          <el-select
            v-if="item.dicRes!=-1"
            v-model="viewAdd.data[item.name]"
            placeholder="请选择"
          >
            <el-option
              v-for="item1 in dics[item.dicRes]"
              :key="item1[item.dicKeyName]"
              :label="item1[item.dicValueName]"
              :value="item1[item.dicKeyName]"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="addCancel()">取消</el-button>
        <el-button type="primary" @click="addSingle()">确定</el-button>
      </div>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog
      title="修改数据"
      :visible.sync="viewEdit.show"
      @close="closeDialog('editForm')"
      :close-on-click-modal="false"
      width="30%"
      id="viewEdit"
    >
      <el-form
        :model="viewEdit.data"
        ref="editForm"
        label-position="right"
        label-width="120px"
      >
        <el-form-item
          v-for="(item,index) in attrsIncludeDic"
          :key="index"
          :label="item.description"
          :prop="item.name"
        >
          <el-input
            v-if="item.dicRes==-1 && item.type=='文本'"
            v-model="viewEdit.data[item.name]"
            placeholder="请输入..."
          ></el-input>
          <el-input-number
            v-if="item.dicRes==-1 && item.type=='数字'"
            v-model="viewEdit.data[item.name]"
            :min="-1"
            placeholder="请输入..."
          ></el-input-number>
          <el-select
            v-if="item.dicRes!=-1"
            v-model="viewEdit.data[item.name]"
            placeholder="请选择"
          >
            <el-option
              v-for="item1 in dics[item.dicRes]"
              :key="item1[item.dicKeyName]"
              :label="item1[item.dicValueName]"
              :value="item1[item.dicKeyName]"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="editCancel()">取消</el-button>
        <el-button type="primary" @click="editSingle()">确定</el-button>
      </div>
    </el-dialog>
    <!-- 删除 -->
    <el-dialog title="删除" :visible.sync="viewDelet.show" width="30%" id="viewDelet">
      <div class="modal-body">您确定删除要删除该项吗?</div>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="viewDelet.show = false">取消</el-button>
        <el-button type="primary" @click="deletSingle()">确定</el-button>
      </div>
    </el-dialog>
    <!-- 对话框 结束 -->
  </div>
</template>

<script>
import axios from "@/libs/axios";
import api from "@/api/data-model/data";
import { Message } from "element-ui";
export default {
  name: "viewDataObj",
  components: {},
  data() {
    return {
      headerTitle: "数据",
      resId: "",
      resKey: 0,
      resKeyValue: "",
      //页面类型
      viewType: false,
      attrs: [],
      attrsIncludeDic: [],
      //页面表格
      viewTable: {
        //dom元素id
        domId: "",
        //样式表类名
        className: "",
        pageInfo: {
          //当前页码
          page: 1,
          //数据总数量
          count: 0,
          //每页包含数据量
          pageSize: 100,
          total: 10
        },
        //数据
        data: []
      },
      //数据搜索
      viewSearch: {
        data: [{ key: "", condition: "", value: "" }]
      },
      viewAdd: {
        index: "",
        data: {},
        show: false
      },
      viewEdit: {
        index: "",
        data: {},
        show: false
      },
      //数据删除功能
      viewDelet: {
        show: false,
        item: {},
        index: ""
      },
      dics: {}
    };
  },
  created() {
    this.resId = parseInt(this.$route.path.split("/")[2]);
    this.getAttrs();
    this.getAttrsIncludeDic();
    this.getTableData();
    this.getDics();
  },
  methods: {
    handleAddSer() {
      this.viewSearch.data.push({ key: "", condition: "", value: "" });
    },
    handleDelThis(index) {
      this.viewSearch.data.splice(index, 1);
      if (this.viewSearch.data.length == 0) {
        // this.viewSearch.data.push({});
      }
    },
    // 获取属性列表
    getAttrs() {
      api
        .getDataObjectAttrsList({
          resId: this.resId,
          pageInfo: { page: 0, pageSize: 0 }
        })
        .then(res => {
          this.attrs = res.data.list;
          for(let i=0;i<res.data.list.length;i++){
            if(res.data.list[i].isKey == "true"){
              this.resKey=res.data.list[i].id;
              this.resKeyValue=res.data.list[i].name;
              return;
            }
          }
        })
        .catch(error => {
          console.log(error);
          Message.error("获取属性列表失败。", error);
        });
    },
    // 获取属性列表（附带字典信息）
    getAttrsIncludeDic() {
      api
        .getDataObjectAttrsList({
          resId: this.resId,
          includeDic: true,
          pageInfo: { page: 0, pageSize: 0 }
        })
        .then(res => {
          this.attrsIncludeDic = res.data.list;
        })
        .catch(error => {
          console.log(error);
          Message.error("获取属性列表失败。", error);
        });
    },
    getDics() {
      api
        .getDataObjectAttrDicList({
          dataObjectId: this.resId,
          pageInfo: { page: 0, pageSize: 0 }
        })
        .then(res => {
          this.dics = res.data;
        })
        .catch(error => {
          console.log(error);
          Message.error("获取字典属性列表失败。", error);
        });
    },
    //获取表格数据
    getTableData() {
      var me=this;
      console.log("ser", this.viewSearch.data);
      var arr = this.viewSearch.data.slice();
      for (var index = arr.length - 1; index >= 0; --index) {
        var element = arr[index];
        if (element.key == "") {
          arr.splice(index, 1);
        }
      }
      api
        .viewData({
          condition: arr,
          dataObjectId: this.resId,
          pageInfo: this.viewTable.pageInfo
        })
        .then(res => {
          this.viewTable.data = res.data.rtnData;
          this.viewTable.pageInfo.total = res.data.pageInfo.total;
        })
        .catch(error => {
          console.log(error);
          Message.error(error.data.message);
          me.viewTable.data=[];
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.viewTable.pageInfo.page = 1;
      this.viewTable.pageInfo.pageSize = val;
      this.getTableData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.viewTable.pageInfo.page = val;
      this.getTableData();
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
      this.viewEdit.index = index;
      this.viewEdit.show = true;
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
     * @function () editCancel()
     * @description 取消
     */
    editCancel() {
      this.viewEdit.show = false;       
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
          .editData({
                dataObjectId: this.resId,
                data: this.viewEdit.data,
                condition: [
                  {key: this.resKeyValue, condition: 'equals', value: this.viewEdit.old[this.resKeyValue]}
                ]
            })
          .then(res => {
            if ((res.success = true)) {
              Message.success("修改成功");
              this.getTableData();
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
     * @function () deleteSingle()
     * @description 删除单项
     */
    deletSingle() {
      api
        .deleteData({
          dataObjectId: this.resId,
          condition: [
            {key: this.resKeyValue, condition: 'equals', value: this.viewDelet.data[this.resKeyValue]}
          ]
        })
        .then(res => {
          if (res.success == true) {
            Message.success("删除成功");
            this.getTableData();
            this.viewDelet.show = false;
          }
        })
        .catch(error => {
          console.log(error);
          Message.error(error);
        });
    },
    /**
     * @function () addCancel()
     * @description 新增弹框取消
     */
    addCancel() {
      this.viewAdd.show = false;
    },
    /**
     * @function () addSingle()
     * @description 新增单项
     */
    addSingle() {
      api
        .addData({
          dataObjectId: this.resId,
          data: this.viewAdd.data
        })
        .then(res => {
          if (res.success == true) {
            Message.success("新增成功");
            this.getTableData();
            this.viewAdd.show = false;
          }
        })
        .catch(error => {
          console.log(error);
          Message.error(error.data.message);
        });
    },
    // 对话框关闭事件
    closeDialog(formRes) {
      // 点击关闭 数据重置
      formRes = formRes || "addform";
      this.$refs[formRes].resetFields();
    },
    /**
     * @function () handleAdd()
     * @description 表格 新增数据
     */
    handleAdd() {
      this.viewAdd.show = true;
    },
  }
};
</script>
