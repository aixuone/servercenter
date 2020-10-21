<template>
  <div class="resource">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <div class="breadxian"></div>
      <el-breadcrumb-item :to="{ path: '/resource' }">资源目录</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="breadbottom"></div>
    <el-container style="min-height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246);border: 1px solid #eee">
        <p>资源分类</p>
        <el-tree
          node-key="id"
          :default-expanded-keys="[1]"
          :default-checked-keys="[2]"
          :data="typeData"
          :props="defaultProps"
          @node-click="handleNodeClick"
          style="margin:10px 0 0 0;"
        ></el-tree>
      </el-aside>
      <el-container>
        <el-header style="margin:10px 0 0 0;height:30px;">
          <!-- 搜索 -->
          <el-form inline :model="viewSearch.data" label-position="right" label-width="80px">
            <el-form-item label="类型">
              <el-select v-model="viewSearch.data.type" placeholder="请选择" class="form-small-width">
                <el-option label="--" value></el-option>
                <el-option label="对象" value="对象"></el-option>
                <el-option label="数据集" value="数据集"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否字典">
              <el-select v-model="viewSearch.data.isDic" placeholder="请选择" class="form-small-width">
                <el-option label="--" value></el-option>
                <el-option label="是" value="true"></el-option>
                <el-option label="否" value="false"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="搜索对象">
              <el-input v-model="viewSearch.data.name" placeholder="输入名称/说明关键词"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSearch()">搜索</el-button>
              <el-button type="danger" @click="handleAdd()">创建</el-button>
            </el-form-item>
          </el-form>
        </el-header>
        <el-main>
          <!-- 表格 -->
          <el-table :data="viewTable.data" border :header-cell-style="{background:'#f9fafc'}">
            <el-table-column prop="id" label="ID" fixed></el-table-column>
            <el-table-column prop="name" label="名称" width="150"></el-table-column>
            <el-table-column prop="type" label="类型" width="150"></el-table-column>
            <el-table-column prop="defined" label="数据定义" width="150"></el-table-column>
            <el-table-column prop="isDic" label="是否字典" width="150" :formatter="dicFilter"></el-table-column>
            <el-table-column prop="description" label="说明"></el-table-column>
            <el-table-column label="操作" width="300" fixed="right">
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
          <!-- 分页 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="viewTable.pageInfo.page"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="viewTable.pageInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="viewTable.pageInfo.total"
          ></el-pagination>
        </el-main>
      </el-container>
    </el-container>
    <!-- 对话框区 开始 -->

    <!-- 新增 -->
    <el-dialog
      title="创建"
      :visible.sync="viewAdd.show"
      @close="closeDialog('addForm')"
      :close-on-click-modal="false"
      width="600px"
      id="viewAdd"
    >
      <el-form
        :model="viewAdd.data"
        :rules="addrules"
        ref="addForm"
        label-position="right"
        label-width="120px"
      >
        <el-form-item label="名称：" prop="name">
          <el-input v-model="viewAdd.data.name" placeholder="请输入表名"></el-input>
        </el-form-item>
        <!-- <el-form-item label="类型：" prop="type">
          <template>
            <el-radio-group v-model="viewAdd.data.type">
              <el-radio label="对象">对象</el-radio>
              <el-radio label="数据集">数据集</el-radio>
            </el-radio-group>
          </template>
        </el-form-item> -->
        <el-form-item label="数据定义：" prop="defined">
          <el-input v-model="viewAdd.data.defined" placeholder="请输入字段名"></el-input>
        </el-form-item>
        <el-form-item v-if="viewAdd.data.type=='对象'" label="是否字典：" prop="isDic">
          <template>
            <el-radio-group v-model="viewAdd.data.isDic">
              <el-radio label="true">是</el-radio>
              <el-radio label="false">否</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item label="说明：">
          <el-input v-model="viewAdd.data.description" placeholder="请输入说明"></el-input>
        </el-form-item>
        <!-- <selectObjAttr v-if="viewAdd.data.type=='数据集'" v-on:listenDatasetAttrs="_getDatasetAttrs"></selectObjAttr> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="addCancel('formb')">取消</el-button>
        <el-button type="primary" @click="addSingle()">确定</el-button>
      </div>
    </el-dialog>
    <!-- 新增数据集 -->
    <datasetAdd
      :resTypeId="viewSearch.data.typeId"
      :reviserules="reviserules"
      :show="datasetAddShow"
      @viewClose="datasetAddClose"
    ></datasetAdd>
    <!-- 修改 -->
    <el-dialog
      title="修改对象属性"
      :visible.sync="viewEdit.show"
      @close="closeDialog('editForm')"
      :close-on-click-modal="false"
      width="45%"
      id="viewEdit"
    >
      <el-form
        :model="viewEdit.data"
        :rules="reviserules"
        ref="editForm"
        label-position="right"
        label-width="120px"
      >
        <el-form-item label="名称：" prop="name">
          <el-input v-model="viewEdit.data.name" placeholder="请输入字段名"></el-input>
        </el-form-item>
        <el-form-item label="类型： " v-show="false" prop="type">
          <template>
            <el-radio-group v-model="viewEdit.data.type">
              <el-radio label="对象">对象</el-radio>
              <el-radio label="数据集">数据集</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item label="数据定义：" prop="defined">
          <el-input v-model="viewEdit.data.defined" placeholder="请输入表名"></el-input>
        </el-form-item>
        <el-form-item v-if="viewEdit.data.type=='对象'" label="是否字典：" prop="isDic">
          <template>
            <el-radio-group v-model="viewEdit.data.isDic">
              <el-radio label="true">是</el-radio>
              <el-radio label="false">否</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item label="说明：" prop="description">
          <el-input v-model="viewEdit.data.description" placeholder="请输入字段说明"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="editCancel()">取消</el-button>
        <el-button type="primary" @click="editSingle()">确定</el-button>
      </div>
    </el-dialog>
    <!-- 修改数据集 -->
    <el-dialog
      title="修改数据集属性"
      :visible.sync="viewDataSetEdit.show"
      @close="closeDialog('editForm')"
      :close-on-click-modal="false"
      width="45%"
      id="viewEdit2"
    >
      <el-steps :active="viewDataSetEdit.step" finish-status="success" align-center>
        <el-step title="属性维护"></el-step>
        <el-step title="注解维护"></el-step>
      </el-steps>
      <div v-if="viewDataSetEdit.step==1">
        <el-form
          :model="viewEdit.data"
          :rules="reviserules"
          ref="editForm"
          label-position="right"
          label-width="120px"
        >
          <el-form-item label="资源分类：" prop="name">
            <SelectTree 
              :props="defaultProps"
              :options="typeData"
              :value="viewEdit.data.typeId"
              :clearable="false"
              :accordion="true"
              @getValue="getValue($event)"/>
          </el-form-item>
          <el-form-item label="名称：" prop="name">
            <el-input v-model="viewEdit.data.name" placeholder="请输入字段名"></el-input>
          </el-form-item>
          <el-form-item label="类型： " v-show="false" prop="type">
            <template>
              <el-radio-group v-model="viewEdit.data.type">
                <el-radio label="对象">对象</el-radio>
                <el-radio label="数据集">数据集</el-radio>
              </el-radio-group>
            </template>
          </el-form-item>
          <el-form-item label="SQL定义：" prop="defined">
            <el-input
              type="textarea"
              :rows="3"
              v-model="viewEdit.data.defined"
              placeholder="请输入SQL定义"
            ></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="22">
              <el-form-item label="条件：" v-for="(item,index) in datasetAttrs" :key="index">
                <el-col :span="22">
                  <el-input v-model="item.description" placeholder="输入查询条件例t.id=#{id}"></el-input>
                </el-col>
                <!-- <el-col :span="8">
                  <el-select v-model="item.type" placeholder="请选择参数类型">
                    <el-option label="文本" value="文本"></el-option>
                    <el-option label="数字" value="数字"></el-option>
                  </el-select>
                </el-col>-->
                <el-col :span="2">
                  <i
                    class="fa fa-minus-circle"
                    @click="handleDelThis(index)"
                    style="font-size:20px,color:red"
                  ></i>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <i class="fa fa-plus-circle" @click="handleAddSer()" style="font-size:30px;"></i>
            </el-col>
          </el-row>
          <el-form-item label="说明：" prop="description">
            <el-input v-model="viewEdit.data.description" placeholder="请输入说明信息"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="danger" @click="editCancel1()">取消</el-button>
          <el-button type="primary" @click="editSingle1()">下一步</el-button>
        </div>
      </div>
      <div v-if="viewDataSetEdit.step==2">
        <el-form inline ref="editForm1" label-position="right" label-width="120px" :model="viewDataSetEdit">
          <div v-for="(item,index) in viewDataSetEdit.data" :key="index">
            <el-form-item label="结果集字段：">
              <el-input v-model="item.name" readonly></el-input>
            </el-form-item>
            <el-form-item label="注解：" :prop="'data.' + index + '.comment'" :rules="{required: true, message: '字段注解不能为空', trigger: 'blur'}"> 
              <el-input v-model="item.comment" placeholder="输入字段注解"></el-input>
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="goStep(1)">上一步</el-button>
          <el-button type="primary" @click="editSingle2()">确定</el-button>
        </div>
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
import selectObjAttr from "./../components/plug_select_objAttr";
import datasetAdd from "./ResourceDatasetAdd";
import SelectTree from "./../components/treeSelect";
export default {
  name: "Resource",
  components: { selectObjAttr, datasetAdd, SelectTree },
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
          pageSize: 100,
          total: 0
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
          name: "",
          typeId: 1
        },
        show: false
      },
      //数据新增功能
      viewAdd: {
        data: {
          name: "",
          type: "",
          defined: "",
          isDic: "",
          typeId: 1
        },
        show: false
      },
      dataTypeId: 1,
      //数据修改功能
      viewEdit: {
        index: "",
        data: {
          name: "",
          type: "",
          defined: "",
          isDic: "",
          description: ""
        },
        show: false
      },
      datasetAddShow: false,
      viewDataSetEdit: {
        step: 1,
        show: false,
        data: [
          {
            resId: -1,
            name: "123",
            comment: ""
          }
        ]
      },
      //数据删除功能
      viewDelet: {
        show: false,
        item: {},
        index: ""
      },
      //新增数据对象的表单的验证
      addrules: {
        name: [{ required: true, message: "请输入字段名", trigger: "blur" }],
        type: [{ required: true, message: "请选择类型", trigger: "change" }],
        defined: [{ required: true, message: "输入数据定义", trigger: "blur" }],
        isDic: [
          { required: true, message: "请选择是否是字典", trigger: "change" }
        ]
      },
      reviserules: {
        name: [
          { required: true, message: "修改后的字段名不能为空", trigger: "blur" }
        ],
        // type: [{ required: true, message: "请选择类型", trigger: "change" }],
        defined: [
          {
            required: true,
            message: "修改后的数据定义不能为空",
            trigger: "blur"
          }
        ],
        isDic: [
          { required: true, message: "请选择是否是字典", trigger: "change" }
        ],
        description: [
          { required: false, message: "请添加对表的描述", trigger: "blur" }
        ]
      },

      //添加数据集 数据集属性列表
      datasetAttrs: [{ description: "" }],
      //新增资源分类
      typeData: [],
      defaultProps: {
        children: "children",
        label: "typeName",
        value: "id"
      }
    };
  },
  created() {
    this.getTypeDataTree();
    //this.getDataObjectsList();
  },
  methods: {
    goStep(step) {
      this.viewDataSetEdit.step = step;
      if (step == 2) {
        //加载字段列表
        let resId = this.viewEdit.data.id;
        api
          .getDataSetColumnList({
            resId: resId
          })
          .then(res => {
            console.log("我是成功返回的res", res);
            this.viewDataSetEdit.data = res.data.list;
          })
          .catch(error => {
            console.log(error);
            Message.error(error.data.message);
          });
      }
    },
    getTypeDataTree() {
      api
        .getTypeDataTree({
          pid: -1
        })
        .then(res => {
          console.log("我是成功返回的res", res);
          this.typeData = res.data.list;
        })
        .catch(error => {
          console.log(error);
          Message.error(error.data.message);
        });
    },
    getDataObjectsList() {
      api
        .getDataObjectsList({
          type: this.viewSearch.data.type,
          isDic: this.viewSearch.data.isDic,
          name: this.viewSearch.data.name,
          pageInfo: this.viewTable.pageInfo,
          typeId: this.viewSearch.data.typeId
        })
        .then(res => {
          console.log("我是成功返回的res", res);
          this.viewTable.data = res.data.list;
          this.viewTable.pageInfo.total = res.data.pageInfo.total;
        })
        .catch(error => {
          console.log(error);
          Message.error(error.data.message);
        });
    },
    //表格操作
    /**
     * @function () handleEdit(item)
     * @description 表格 修改弹窗
     * @param {Object} item 表格一行数据
     * @param {String} index 数据第几项
     */
    async handleEdit(item, index) {
      console.log("edit", item, index);
      this.viewEdit.data = Object.assign({}, item);
      this.viewEdit.old = Object.assign({}, item);
      this.viewEdit.index = index;
      if ("数据集" == item.type) {
        this.viewDataSetEdit.show = true;
        this.getAttrs(item.id);
      } else {
        this.viewEdit.show = true;
      }
    },

    /**
     * @function () diff(obj1,obj2)
     * @description 验证修改前和修改后是不是一致
     * @param {Object} item
     * @param {String} index 数据第几项
     */

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
        // console.log("属性",attr)
        var t1 = obj1[attr] instanceof Object;

        var t2 = obj2[attr] instanceof Object;
        // console.log(55,t1,t2)
        if (t1 && t2) {
          return diff(obj1[attr], obj2[attr]);
        } else if (obj1[attr] !== obj2[attr]) {
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
      let dataType = this.viewEdit.data.type;
      let diffValue = this.diff(this.viewEdit.data, this.viewEdit.old);
      if (dataType == "对象" && diffValue) {
        Message.warning("修改前和修改后的数据一致");
      } else {
        this.$refs["editForm"].validate(valid => {
          if (valid) {
            if (!diffValue) {
              api
                .editDataObject(this.viewEdit.data)
                .then(res => {
                  console.log("修改", res);
                  if ((res.success = true)) {
                    Message.success("修改成功");
                    this.handleSearch();
                    this.viewEdit.show = false;
                  }
                })
                .catch(error => {
                  console.log(error);
                  Message.error(error.data.message);
                });
            }
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
    },

    /**
     * @function () editSingle1()
     * @description 修改数据集单项
     */
    editSingle1() {
      let dataType = this.viewEdit.data.type;
      let diffValue = this.diff(this.viewEdit.data, this.viewEdit.old);
      this.$refs["editForm"].validate(valid => {
        if (valid) {
          if (!diffValue) {
            api
              .editDataObject(this.viewEdit.data)
              .then(res => {
                console.log("修改", res);
                if ((res.success = true)) {
                  Message.success("修改成功");
                  this.handleSearch();
                  if (
                    dataType == "数据集" &&
                    this.datasetAttrs &&
                    this.datasetAttrs.length > 0
                  ) {
                    //编辑属性列表
                    this.addDatasetAttrs(this.viewEdit.data.id, "edit");
                  } else {
                    this.goStep(2);
                  }
                }
              })
              .catch(error => {
                console.log(error);
                Message.error(error.data.message);
              });
          } else if (
            dataType == "数据集" &&
            this.datasetAttrs &&
            this.datasetAttrs.length > 0
          ) {
            //编辑属性列表
            this.addDatasetAttrs(this.viewEdit.data.id, "edit");
          } else {
            goStep(2);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    editSingle2() {
      let errorData = this.viewDataSetEdit.data.filter(function(item) {
        return item.comment == null || item.comment == "";
      });
      if (errorData.length > 0) {
        Message.error("注解没有填写完整");
        return;
      }
      this.$refs["editForm1"].validate(valid => {
        if (valid) {
      api
        .editDataSetColumns({
          list: this.viewDataSetEdit.data,
          resId: this.viewEdit.data.id
        })
        .then(res => {
          console.log("修改", res);
          if ((res.success = true)) {
            Message.success("修改成功");
            this.handleSearch();
            this.goStep(1);
            this.viewDataSetEdit.show = false;
          }
        })
        .catch(error => {
          console.log(error);
          Message.error(error.data.message);
        });
        }});
    },
    /**
     * @function () editCancel()
     * @description 取消
     */
    editCancel() {
      this.viewEdit.show = false;
      this.$refs["editForm"].resetFields();
    },
    editCancel1() {
      this.viewDataSetEdit.show = false;
      this.$refs["editForm"].resetFields();
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
          Message.error(error.data.message);
        });
    },

    /**
     * @function () handleDelet(item)
     * @description 表格 修改数据
     * @param {Object} item 表格一行数据
     */
    handleAdd(item) {
      if (this.dataTypeId == 1) {
        this.datasetAddShow = true;
        this.viewAdd.data.type = "数据集";
      } else {
        this.viewAdd.show = true;
        this.viewAdd.data.type = "对象";
      }
      this.viewAdd.data.typeId = this.viewSearch.data.typeId;
    },
    closeDialog(formName) {
      // 点击关闭 数据重置
      if (this.viewDataSetEdit.step == 2) {
        this.goStep(1);
        return;
      } else {
        this.$refs[formName].resetFields();
      }
    },
    /**
     * @function () addeSingle()
     * @description 添加单项
     */
    addSingle() {
      this.$refs["addForm"].validate(valid => {
        console.log(this.viewAdd.data);
        if (valid) {
          console.log("验证通过", this.datasetAttrs);
          var o = Object.assign({}, this.viewAdd.data);
          if (
            o.type == "对象" ||
            (o.type == "数据集" &&
              this.datasetAttrs &&
              this.datasetAttrs.length > 0)
          ) {
            api
              .addDataObject(o)
              .then(res => {
                if (res.success == true) {
                  Message.success("添加成功");
                  if (o.type == "对象") {
                    this.handleSearch();
                  } else {
                    //添加属性列表
                    this.addDatasetAttrs(res.data.id, "add");
                    this.handleSearch();
                  }
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
                Message.error(error.data.message);
              });
          } else {
            Message.warning("创建数据集，数据集属性不能为空。");
            return;
          }
        } else {
          console.log("error submit!!");
          Message.warning("请确认表单是否填写完整。");
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
      // this.dialogFormVisible = false;
      this.$refs["addForm"].resetFields();
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
          pageInfo: this.viewTable.pageInfo,
          typeId: this.viewSearch.data.typeId
        })
        .then(res => {
          this.viewTable.data = res.data.list;
        })
        .catch(error => {
          console.log(error);
          Message.error(error.data.message);
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
      if (item.type == "对象") {
        this.$router.push({ path: "/resource/" + item.id + "/data" });
      } else if (item.type == "数据集") {
        this.$router.push({ path: "/resource/" + item.id + "/dataset" });
      }
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
    addDatasetAttrs(resId, resView) {
      var me = this;
      var list = this.datasetAttrs;
      if (list.length <= 0) {
        return;
      }
      console.log("adddDatasetAttrs 接口", list);
      api
        .addDataObjectAttr({ objectId: resId, list: list })
        .then(res => {
          console.log("添加属性", res);
          if (res.success == true) {
            Message.success("添加数据集属性成功。");
            if ("edit" == resView) {
              me.goStep(2);
              // this.viewEdit.show = false;
            } else {
              this.viewAdd.show = false;
            }
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
      this.datasetAttrs = val;
    },
    // 获取属性列表
    getAttrs(resId) {
      api
        .getDataObjectAttrsList({
          resId: resId,
          pageInfo: { page: 0, pageSize: 0 }
        })
        .then(res => {
          this.datasetAttrs = res.data.list;
        })
        .catch(error => {
          console.log(error);
          Message.error("获取属性列表失败。", error);
        });
    },
    //是否字典 过滤器 改 t/f 为  是/否
    dicFilter(bool) {
      return bool.isDic == "true"
        ? "是"
        : bool.isDic == "false"
        ? "否"
        : "未知";
    },
    handleNodeClick(data) {
      console.log(data);
      this.dataTypeId = data.category;
      this.viewSearch.data.typeId = data.id;
      this.getDataObjectsList();
    },
    handleAddSer() {
      this.datasetAttrs.push({ description: "" });
    },
    handleDelThis(index) {
      this.datasetAttrs.splice(index, 1);
      if (this.datasetAttrs.length == 0) {
        this.datasetAttrs.push({});
      }
    },
    datasetAddClose(val) {
      this.datasetAddShow = val;
      this.handleSearch();
    },
    // 取值
    getValue(value){
      this.viewEdit.data.typeId = value;
    }
  }
};
</script>
