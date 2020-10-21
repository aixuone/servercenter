<template>
  <!-- 新增数据集 -->
  <el-dialog
    title="新增数据集"
    :visible.sync="show"
    @close="closeDialog('addForm')"
    :close-on-click-modal="false"
    width="45%"
    id="viewAdd2"
  >
    <el-steps :active="viewDataSetEdit.step" finish-status="success" align-center>
      <el-step title="属性维护"></el-step>
      <el-step title="注解维护"></el-step>
    </el-steps>
    <div v-if="viewDataSetEdit.step==1">
      <el-form
        :model="viewAdd.data"
        :rules="reviserules"
        ref="addForm"
        label-position="right"
        label-width="120px"
      >
        <el-form-item label="资源分类：" prop="name">
            <SelectTree 
              :props="defaultProps"
              :options="typeData"
              :value="viewAdd.data.typeId"
              :clearable="false"
              :accordion="true"
              @getValue="getValue($event)"/>
        </el-form-item>
        <el-form-item label="名称：" prop="name">
          <el-input v-model="viewAdd.data.name" placeholder="请输入字段名"></el-input>
        </el-form-item>
        <el-form-item label="类型： " v-show="false" prop="type">
          <template>
            <el-radio-group v-model="viewAdd.data.type">
              <el-radio label="对象">对象</el-radio>
              <el-radio label="数据集">数据集</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item label="SQL定义：" prop="defined">
          <el-input type="textarea" :rows="3" v-model="viewAdd.data.defined" placeholder="请输入SQL定义"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="22">
            <el-form-item label="条件：" v-for="(item,index) in datasetAttrs" :key="index">
              <el-col :span="22">
                <el-input v-model="item.description" placeholder="输入查询条件例t.id=#{id}"></el-input>
                <!-- <el-col :span="8">
                <el-select v-model="item.type" placeholder="请选择参数类型">
                  <el-option label="文本" value="文本"></el-option>
                  <el-option label="数字" value="数字"></el-option>
                </el-select>
                </el-col>-->
              </el-col>
              <el-col :span="2">
                <i
                  class="el-icon-remove"
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
          <el-input v-model="viewAdd.data.description" placeholder="请输入说明信息"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="addCancel1()">取消</el-button>
        <el-button type="primary" @click="addSingle1()">下一步</el-button>
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
</template>
<script>
import axios from "@/libs/axios";
import api from "@/api/data-model/data";
import { Message } from "element-ui";
import SelectTree from "./../components/treeSelect";

export default {
  name: "ResouceAdd",
  components: { SelectTree },
  props: {
    reviserules: Object,
    show: Boolean,
    resTypeId: Number
  },
  data() {
    return {
      resId: -1,
      //添加数据集 数据集属性列表
      datasetAttrs: [{ description: "" }],
      //数据新增功能
      viewAdd: {
        data: {
          name: "",
          type: "数据集",
          defined: "",
          isDic: "",
          typeId: this.resTypeId
        },
        show: false
      },
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
  methods: {
    goStep(step) {
      this.viewDataSetEdit.step = step;
      if (step == 2) {
        //加载字段列表
        api
          .getDataSetColumnList({
            resId: this.resId
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
    closeDialog(formName) {
      // 点击关闭 数据重置
      if (this.viewDataSetEdit.step == 2) {
        this.goStep(1);
        this.$emit("viewClose", false);
        return;
      } else {
        this.$refs[formName].resetFields();
      }
    },
    addCancel1() {
      this.$refs["addForm"].resetFields();
      this.$emit("viewClose", false);
      this.datasetAttrs = [{ description: "" }];
    },
    addSingle1() {
      this.$refs["addForm"].validate(valid => {
        if (valid) {
          var o = Object.assign({}, this.viewAdd.data);
          api
            .addDataObject(o)
            .then(res => {
              if (res.success == true) {
                Message.success("添加成功");
                //清除新建窗口信息
                this.$refs["addForm"].resetFields();
                if (this.datasetAttrs && this.datasetAttrs.length > 0) {
                  //添加属性列表
                  this.addDatasetAttrs(res.data.id, "add");
                  this.viewAdd.data.id = res.data.id;
                  this.resId = res.data.id;
                }
              } else {
                Message.error("添加失败。");
              }
            })
            .catch(error => {
              console.log(error);
              Message.error(error.data.message);
            });
        } else {
          console.log("error submit!!");
          Message.warning("请确认表单是否填写完整。");
          return false;
        }
      });
    },
    // 创建数据集的同时添加属性  添加属性列表
    addDatasetAttrs(resId, resView) {
      var me = this;
      var list = this.datasetAttrs;
      if (list.length <= 0) {
        this.goStep(2);
        return;
      }
      console.log("adddDatasetAttrs 接口", list);
      api
        .addDataObjectAttr({ objectId: resId, list: list })
        .then(res => {
          console.log("添加属性", res);
          if (res.success == true) {
            Message.success("添加数据集属性成功。");
            me.goStep(2);
          } else {
            Message.error("添加数据集属性失败。");
          }
        })
        .catch(error => {
          console.log(error);
          Message.error("添加数据集属性失败。" + error);
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
      api
        .editDataSetColumns({
          list: this.viewDataSetEdit.data,
          resId: this.resId
        })
        .then(res => {
          console.log("新增", res);
          if ((res.success = true)) {
            Message.success("新增成功");
            this.$emit("viewClose", false);
            this.datasetAttrs = [{ description: "" }];
          }
        })
        .catch(error => {
          console.log(error);
          Message.error(error.data.message);
        });
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
    getTypeDataTree() {
      api
        .getTypeDataTree({
          pid: 2
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
    // 取值
    getValue(value){
      this.viewAdd.data.typeId = value;
    }
  },
  watch: {
    resTypeId: function(val) {
      this.viewAdd.data.typeId = val;
    }
  },
  created() {
    this.getTypeDataTree();
    //this.getDataObjectsList();
  }
};
</script>