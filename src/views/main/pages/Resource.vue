<template>
    <div class="resource">
        <!-- 搜索 -->
        <el-form inline :model="viewSearch.data" label-position="right" label-width="80px">
            <el-form-item label="类型">
                <el-select v-model="viewSearch.data.type" placeholder="请选择">
                    <el-option label="对象" value="对象"></el-option>
                    <el-option label="数据集" value="数据集"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否字典">
                <el-select v-model="viewSearch.data.isDic" placeholder="请选择">
                    <el-option label="是" value="是"></el-option>
                    <el-option label="否" value="否"></el-option>
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
        <!-- 表格 -->
        <div class="viewTableClass">
            <el-table :data="viewTable.data" border :header-cell-style="{background:'#f9fafc'}">
                <el-table-column prop="id" label="ID" width="50"></el-table-column>
                <el-table-column prop="name" label="名称" width="150"></el-table-column>
                <el-table-column prop="type" label="类型" width="150"></el-table-column>
                <el-table-column prop="defined" label="数据定义" width="150"></el-table-column>
                <el-table-column prop="isDic" label="是否字典" width="150"></el-table-column>
                <el-table-column prop="description" label="说明"></el-table-column>
                <el-table-column label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="handleData(scope.row,scope.$index)">数据</el-button>
                        <el-button type="primary" size="small" @click="handleAttr(scope.row,scope.$index)">属性</el-button>
                        <el-button type="primary" size="small" @click="handleEdit(scope.row,scope.$index)">修改</el-button>
                        <el-button type="danger" size="small" @click="handleDelet(scope.row,scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </div>
        <!-- 分页 -->
        <el-pagination class="pageArea" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="viewTable.pageInfo.page" :page-sizes="[100, 200, 300, 400]" :page-size="viewTable.pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="400">
        </el-pagination>
        <!-- 对话框区 开始 -->
        <!-- 新增 -->
        <el-dialog title="创建数据对象" :visible.sync="viewAdd.show" width="30%" id="viewAdd">
            <el-form :model="viewAdd.data" label-position="right" label-width="120px">
                <el-form-item label="名称：">
                    <el-input v-model="viewAdd.data.name" placeholder="请输入字段名"></el-input>
                </el-form-item>
                <el-form-item label="类型：">
                    <template>
                        <el-radio v-model="viewAdd.data.type" label="对象">对象</el-radio>
                        <el-radio v-model="viewAdd.data.type" label="数据集">数据集</el-radio>
                    </template>
                </el-form-item>
                <el-form-item label="数据定义：">
                    <el-input type="textarea" :rows="3" v-model="viewAdd.data.defined" placeholder="请输入字段名"></el-input>
                </el-form-item>
                <el-form-item label="是否字典：">
                    <template>
                        <el-radio v-model="viewAdd.data.isDic" label="true">是</el-radio>
                        <el-radio v-model="viewAdd.data.isDic" label="false">否</el-radio>
                    </template>
                </el-form-item>
                <el-form-item label="说明：">
                    <el-input v-model="viewAdd.data.description" placeholder="请输入字段名"></el-input>
                </el-form-item>

                <selectObjAttr v-if="viewAdd.data.type=='数据集'"></selectObjAttr>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="danger" @click="viewAdd.show = false">取消</el-button>
                <el-button type="primary" @click="addSingle()">确定</el-button>
            </div>
        </el-dialog>
        <!-- 修改 -->
        <el-dialog title="修改数据集属性" :visible.sync="viewEdit.show" width="30%" id="viewEdit">
            <el-form :model="viewEdit.data" label-position="right" label-width="120px">
                <el-form-item label="名称：">
                    <el-input v-model="viewEdit.data.name" placeholder="请输入字段名"></el-input>
                </el-form-item>
                <el-form-item label="类型：">
                    <template>
                        <el-radio v-model="viewEdit.data.type" label="对象">对象</el-radio>
                        <el-radio v-model="viewEdit.data.type" label="数据集">数据集</el-radio>
                    </template>
                </el-form-item>
                <el-form-item label="数据定义：">
                    <el-input v-model="viewEdit.data.defined" placeholder="请输入字段名"></el-input>
                </el-form-item>
                <el-form-item label="是否字典：">
                    <template>
                        <el-radio v-model="viewEdit.data.isDic" label="true">是</el-radio>
                        <el-radio v-model="viewEdit.data.isDic" label="false">否</el-radio>
                    </template>
                </el-form-item>
                <el-form-item label="说明：">
                    <el-input v-model="viewEdit.data.description" placeholder="请输入字段名"></el-input>
                </el-form-item>
                <selectObjAttr v-if="viewEdit.data.type=='数据集'"></selectObjAttr>
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
import axios from "@/libs/axios";
import api from "@/api/data-model/data";
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
        data: {
          list1: [],
          list2: []
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
    },
    // 搜索 得到表格数据
    handleSearch() {
      console.log("搜索");
      this.viewTable.data = api.getDataObjectsList({
        type: this.viewSearch.type,
        isDic: this.viewSearch.isDic,
        name: this.viewSearch.name,
        pageInfo: this.viewTable.pageInfo
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
      handleSearch();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      handleSearch();
    }
  }
};
</script>
