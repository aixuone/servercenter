<template>
  <div class="resource">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <div class="breadxian"></div>
      <el-breadcrumb-item :to="{ path: '/resource' }">资源目录</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="breadbottom"></div>
    <!-- 搜索 -->
    <el-form
      inline
      :model="viewSearch.data"
      label-position="right"
      label-width="80px"
    >
      <el-form-item label="类型">
        <el-select
          v-model="viewSearch.data.type"
          placeholder="请选择"
        >
          <el-option
            label="--"
            value=""
          ></el-option>
          <el-option
            label="对象"
            value="对象"
          ></el-option>
          <el-option
            label="数据集"
            value="数据集"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否字典">
        <el-select
          v-model="viewSearch.data.isDic"
          placeholder="请选择"
        >
          <el-option
            label="--"
            value=""
          ></el-option>
          <el-option
            label="是"
            value="true"
          ></el-option>
          <el-option
            label="否"
            value="false"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="搜索对象">
        <el-input
          v-model="viewSearch.data.name"
          placeholder="输入名称/说明关键词"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="handleSearch()"
        >搜索</el-button>
        <el-button
          type="danger"
          @click="handleAdd()"
        >创建</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <div class="viewTableClass">
      <el-table
        :data="viewTable.data"
        border
        :header-cell-style="{background:'#f9fafc'}"
      >
        <el-table-column
          prop="id"
          label="ID"
          width="50"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="defined"
          label="数据定义"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="isDic"
          label="是否字典"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="description"
          label="说明"
        ></el-table-column>
        <el-table-column
          label="操作"
          width="300"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="handleData(scope.row,scope.$index)"
            >数据</el-button>
            <el-button
              type="primary"
              size="small"
              @click="handleAttr(scope.row,scope.$index)"
            >属性</el-button>
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
    >
    </el-pagination>
    <!-- 对话框区 开始 -->
    <!-- 新增 -->
    <el-dialog
      title="创建数据对象"
      :visible.sync="viewAdd.show"
      width="30%"
      id="viewAdd"
    >
      <el-form
        :model="viewAdd.data"
        :rules="rules" 
        ref="viewAdd.data"
        label-position="right"
        label-width="120px"
      >
        <el-form-item label="名称：" prop='name'>
          <el-input
            v-model="viewAdd.data.name"
            placeholder="请输入字段名"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型：" prop='type'>
          <template>
            <el-radio 
              v-model="viewAdd.data.type"
              label="对象"
            >对象</el-radio>
            <el-radio
              v-model="viewAdd.data.type"
              label="数据集"
            >数据集</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="数据定义：" prop='defined' >
          <el-input
            type="textarea"
            :rows="3"
            v-model="viewAdd.data.defined"
            placeholder="请输入字段名"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否字典：" prop='isDic'>
          <template>
            <el-radio
              v-model="viewAdd.data.isDic"
              label="true"
            >是</el-radio>
            <el-radio
              v-model="viewAdd.data.isDic"
              label="false"
            >否</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="说明："  prop='description'>
          <el-input
            v-model="viewAdd.data.description"
            placeholder="请输入字段名"
          ></el-input>
        </el-form-item>

        <selectObjAttr
          v-if="viewAdd.data.type=='数据集'"
          v-on:listenDatasetAttrs="_getDatasetAttrs"
        ></selectObjAttr>

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
    <el-dialog
      title="修改数据集属性"
      :visible.sync="viewEdit.show"
      width="30%"
      id="viewEdit"
    >
      <el-form
        :model="viewEdit.data"
        :rules="rules" ref="viewEdit.data"
        label-position="right"
        label-width="120px"
      >
        <el-form-item label="名称：" prop="name">
          <el-input
            v-model="viewEdit.data.name"
            placeholder="请输入字段名"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="类型："
          v-show="false"
          prop="type"
        >
          <template>
            <el-radio
              v-model="viewEdit.data.type"
              label="对象"
            >对象</el-radio>
            <el-radio
              v-model="viewEdit.data.type"
              label="数据集"
            >数据集</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="数据定义：" prop="defined">
          <el-input
            v-model="viewEdit.data.defined"
            placeholder="请输入字段名"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否字典：" prop="isDic">
          <template>
            <el-radio
              v-model="viewEdit.data.isDic"
              label="true"
            >是</el-radio>
            <el-radio
              v-model="viewEdit.data.isDic"
              label="false"
            >否</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="说明：" prop="description">
          <el-input
            v-model="viewEdit.data.description"
            placeholder="请输入字段名"
          ></el-input>
        </el-form-item>
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
      <div class="modal-body">
        您确定删除要删除该项吗?
      </div>
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
    <!-- 对话框 结束 -->

  </div>
</template>

<script>
import axios from "@/libs/axios";
import api from "@/api/data-model/data";
import { Message } from "element-ui";
import selectObjAttr from "./../components/plug_select_objAttr";
export default {
  name: "Resource",
  components: { selectObjAttr },
  data() {
    return {
      //数据对象
      dataObject: {
        id: "", //主键
        name: "" //中文名称
      },
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
          pageSize: 100
        },
        //数据
        data: []
      },
      //接口信息 *need
      //数据搜索功能
      viewSearch: {
        data: {
          type: "",
          isDic: "",
          name: ""
        },
        show: false
      },
      //数据新增功能
      viewAdd: {
        data: {},
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
       //表单的验证
        rules: {
          name: [
            { required: true, message: '请输入字段名', trigger: 'blur' }
          ],
          type: [
            {required: true,  message: '请选择类型', trigger: 'change'}
          ],
          defined: [
            {required: true,  message: '输入数据定义', trigger: 'blur'}
          ],
          isDic: [
            { required: true, message: '请选择是否是字典',trigger: 'change' }
          ],
          description: [
            {required: true,  message: '请输入说明', trigger: 'blur' }
          ]
        },
      //添加数据集 数据集属性列表
      _DatasetAttrs: []
    };
  },
  created() {
    api
      .getDataObjectsList({
        type: this.viewSearch.data.type,
        isDic: this.viewSearch.data.isDic,
        name: this.viewSearch.data.name,
        pageInfo: this.viewTable.pageInfo
      })
      .then(res => {
        console.log ("我是成功返回的res",res)
        this.viewTable.data = res.data.list;
        this.viewTable.pageInfo.total = res.data.pageInfo.total;
      })
      .catch(error => {
        console.log(error);
        Message.error(error);
      });
  },
  methods: {
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
     * @function () diff(obj1,obj2)
     * @description 验证修改前和修改后是不是一致
     * @param {Object} item 
     * @param {String} index 数据第几项
     */



    diff(obj1,obj2){
      console.log("我是diff",1111)
        // console.log('obj12'+ obj1,obj2)
        var o1 = obj1 instanceof Object;
        var o2 = obj2 instanceof Object;
        console.log(22,o1,o2)
        if(!o1 || !o2){/*  判断不是对象  */
            return obj1 === obj2;
        }

        if(Object.keys(obj1).length !== Object.keys(obj2).length){
            return false;
            //Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
        }

        for(var attr in obj1){
          console.log("属性",attr)
            var t1 = obj1[attr] instanceof Object;

            var t2 = obj2[attr] instanceof Object;
            console.log(55,t1,t2)
            if(t1 && t2){
              console.log(888)
                return diff(obj1[attr],obj2[attr]);
               
            }else if(obj1[attr] !== obj2[attr]){
               console.log(999)
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
        if(this.diff(this.viewEdit.data,this.viewEdit.old)==true){
           Message.warning("修改前和修改后的数据一致");
        }else{
            this.$refs['viewEdit.data'].validate((valid) => {
            if (valid) {
               api
              .editDataObject(this.viewEdit.data)
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
                        
            } else {
                console.log('error submit!!');
                 return false;
            }
        });
      }



     
    },

 /**
     * @function () editCancel()
     * @description 取消
     */
        editCancel() {
            this.viewEdit.show = false;
            this.$refs['viewEdit.data'].resetFields();
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
      api
        .deleteDataObject({
          id: this.viewDelet.item.id
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
    /**
     * @function () addeSingle()
     * @description 添加单项
     */
    addSingle() {
      this.$refs['viewAdd.data'].validate((valid) => {
              if (valid) {
                console.log(this._DatasetAttrs);
                var o = Object.assign({}, this.viewAdd.data);
                console.log(o.type);        
              if (o.type=="对象"||(o.type=="数据集"&&this._DatasetAttrs && this._DatasetAttrs.length > 0)) {
                api
                  .addDataObject(o)
                  .then(res => {
                    if (res.success == true) {
                      Message.success("添加成功");
                      if (o.type == "对象") {
                        this.handleSearch();
                      } else {
                        console.log("addDataAttrs 开始");
                        //添加属性列表
                        this.addDatasetAttrs(res.data.id);
                      }
                      this.handleSearch();
                      //清除新建窗口信息
                      for (var i in this.viewAdd.data) {
                        this.viewAdd.data[i] = "";
                      }
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
                Message.warning("创建数据集，数据集属性不能为空。");
                return;
              }
            } else {
                console.log('error submit!!');
                return false;
            }
      });
   
    },

    /**
     * @function () addCancel()
     * @description 新增弹框取消
     */
    addCancel(){
        this.viewAdd.show = false
        this.$refs['viewAdd.data'].resetFields();
    },



    // 搜索 得到表格数据
    handleSearch() {
      console.log(
        this.viewSearch.data.type,
        this.viewSearch.data.isDic,
        this.viewSearch.data.name
      );
      api
        .getDataObjectsList({
          type: this.viewSearch.data.type,
          isDic: this.viewSearch.data.isDic,
          name: this.viewSearch.data.name,
          pageInfo: this.viewTable.pageInfo
        })
        .then(res => {
          this.viewTable.data = res.data.list;
        })
        .catch(error => {
          console.log(error);
          Message.error(error);
        });
    },
    // 打开属性列表界面
    handleAttr(item, index) {
      console.log(item, index);
      if (item.type == "对象") {
        this.$router.push({ path: "/resource/object/" + item.id });
      } else if (item.type == "数据集") {
        this.$router.push({ path: "/resource/dataset/" + item.id });
      }
    },
    // 查看数据
    handleData(item, index) {
      this.$router.push({ path: "/resource/" + item.id + "/data" });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.viewTable.pageInfo.page = 1;
      this.viewTable.pageInfo.pageSize = val;
      this.handleSearch();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.viewTable.pageInfo.page = val;
      this.handleSearch();
    },
    // 创建数据集的同时添加属性  添加属性列表
    addDatasetAttrs(resId) {
      var list = this._DatasetAttrs;
      if (list.length <= 0) {
        return;
      }
      console.log("adddDatasetAttrs 接口", list);

      api
        .addDataObjectAttr({ objectId: resId , list: list })
        .then(res => {
          console.log("添加属性", res);
          if (res.success == true) {
            Message.success("添加数据集属性成功。");
            this.viewAdd.show = false;
          } else {
            Message.error("添加数据集属性失败。");
          }
        })
        .catch(error => {
          console.log(error);
          Message.error("添加数据集属性失败。" + error);
        });
    },
    //获取selectObjAttr 回传值
    _getDatasetAttrs(val) {
      console.log("_getDatasetAttrs", val);
      this._DatasetAttrs = val;
    }
  }
};
</script>
