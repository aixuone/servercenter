<template>
  <div class="resource">
    <!-- 搜索 -->
    <el-form inline :model="viewSearch.data" label-position="right" label-width="80px">
      <el-form-item label="搜索">
        <el-input v-model="viewSearch.data.name" placeholder="输入名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="viewSearch.show=true">更多搜索</el-button>
        <el-button type="primary" @click="handleSearch()">搜索</el-button>
        <el-button type="danger" @click="handleAdd()">创建</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <div class="viewTableClass">
      <el-table :data="viewTable.data" border :header-cell-style="{background:'#f9fafc'}">
        <el-table-column prop="id" label="id"
                         width="150"></el-table-column>
        <el-table-column prop="username" label="登录名"
                         width="150"></el-table-column>
        <el-table-column prop="password" label="密码"
                         width="150"></el-table-column>
        <el-table-column prop="mobile" label="手机号"
                         width="150"></el-table-column>
        <el-table-column prop="name" label="用户姓名"
                         width="150"></el-table-column>
        <el-table-column prop="userSex" label="用户性别"
                         width="150"></el-table-column>
        <el-table-column prop="company" label="公司"
                         width="150"></el-table-column>
        <el-table-column prop="dept" label="部门"
                         width="150"></el-table-column>
        <el-table-column prop="neUsername" label="网易登录名"
                         width="150"></el-table-column>
        <el-table-column prop="wxid" label="微信号"
                         width="150"></el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row,scope.$index)">修改
            </el-button>
            <el-button type="danger" size="small" @click="handleDelet(scope.row,scope.$index)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
    <!-- 分页 -->
    <!--<el-pagination class="pageArea" @size-change="handleSizeChange" @current-change="handleCurrentChange"-->
                   <!--:current-page="viewTable.pageInfo.page" :page-sizes="[100, 200, 300, 400]"-->
                   <!--:page-size="viewTable.pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper"-->
                   <!--:total="400">-->
    <!--</el-pagination>-->
    <!-- 对话框区 开始 -->
    <!-- 更多搜索 -->
    <el-dialog title="更多搜索" :visible.sync="viewSearch.show" width="30%" id="viewSearch">
      <el-form :model="viewSearch.data" label-position="right" label-width="120px">
        <el-form-item label="id" prop="id">
          <el-input v-model="viewSearch.data.id"
                    placeholder="请输入id"></el-input>
        </el-form-item>
        <el-form-item label="登录名" prop="username">
          <el-input v-model="viewSearch.data.username"
                    placeholder="请输入登录名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="viewSearch.data.password"
                    placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="viewSearch.data.mobile"
                    placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" prop="name">
          <el-input v-model="viewSearch.data.name"
                    placeholder="请输入用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="用户性别" prop="userSex">
          <el-input v-model="viewSearch.data.userSex"
                    placeholder="请输入用户性别"></el-input>
        </el-form-item>
        <el-form-item label="公司" prop="company">
          <el-input v-model="viewSearch.data.company"
                    placeholder="请输入公司"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="dept">
          <el-input v-model="viewSearch.data.dept"
                    placeholder="请输入部门"></el-input>
        </el-form-item>
        <el-form-item label="网易登录名" prop="neUsername">
          <el-input v-model="viewSearch.data.neUsername"
                    placeholder="请输入网易登录名"></el-input>
        </el-form-item>
        <el-form-item label="微信号" prop="wxid">
          <el-input v-model="viewSearch.data.wxid"
                    placeholder="请输入微信号"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="viewSearch.show = false">取消</el-button>
        <el-button type="primary" @click="handleSearch()">搜索</el-button>
      </div>
    </el-dialog>
    <!-- 新增 -->
    <el-dialog title="创建" :visible.sync="viewAdd.show" width="30%" id="viewAdd">
      <el-form :model="viewAdd.data" label-position="right" label-width="120px">
        <el-form-item label="id" prop="id">
          <el-input v-model="viewAdd.data.id"
                    placeholder="请输入id"></el-input>
        </el-form-item>
        <el-form-item label="登录名" prop="username">
          <el-input v-model="viewAdd.data.username"
                    placeholder="请输入登录名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="viewAdd.data.password"
                    placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="viewAdd.data.mobile"
                    placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" prop="name">
          <el-input v-model="viewAdd.data.name"
                    placeholder="请输入用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="用户性别" prop="userSex">
          <el-input v-model="viewAdd.data.userSex"
                    placeholder="请输入用户性别"></el-input>
        </el-form-item>
        <el-form-item label="公司" prop="company">
          <el-input v-model="viewAdd.data.company"
                    placeholder="请输入公司"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="dept">
          <el-input v-model="viewAdd.data.dept"
                    placeholder="请输入部门"></el-input>
        </el-form-item>
        <el-form-item label="网易登录名" prop="neUsername">
          <el-input v-model="viewAdd.data.neUsername"
                    placeholder="请输入网易登录名"></el-input>
        </el-form-item>
        <el-form-item label="微信号" prop="wxid">
          <el-input v-model="viewAdd.data.wxid"
                    placeholder="请输入微信号"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="viewAdd.show = false">取消</el-button>
        <el-button type="primary" @click="addSingle()">确定</el-button>
      </div>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog title="修改数据集属性" :visible.sync="viewEdit.show" width="30%" id="viewEdit">
      <el-form :model="viewEdit.data" label-position="right" label-width="120px">
        <el-form-item label="id" prop="id">
          <el-input v-model="viewEdit.data.id"
                    placeholder="请输入id"></el-input>
        </el-form-item>
        <el-form-item label="登录名" prop="username">
          <el-input v-model="viewEdit.data.username"
                    placeholder="请输入登录名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="viewEdit.data.password"
                    placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="viewEdit.data.mobile"
                    placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" prop="name">
          <el-input v-model="viewEdit.data.name"
                    placeholder="请输入用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="用户性别" prop="userSex">
          <el-input v-model="viewEdit.data.userSex"
                    placeholder="请输入用户性别"></el-input>
        </el-form-item>
        <el-form-item label="公司" prop="company">
          <el-input v-model="viewEdit.data.company"
                    placeholder="请输入公司"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="dept">
          <el-input v-model="viewEdit.data.dept"
                    placeholder="请输入部门"></el-input>
        </el-form-item>
        <el-form-item label="网易登录名" prop="neUsername">
          <el-input v-model="viewEdit.data.neUsername"
                    placeholder="请输入网易登录名"></el-input>
        </el-form-item>
        <el-form-item label="微信号" prop="wxid">
          <el-input v-model="viewEdit.data.wxid"
                    placeholder="请输入微信号"></el-input>
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
  import axios from "@/libs/axios";
  import api from "@/api/data-model/data";
  import {Message} from 'element-ui';

  export default {
    name: "TTianyiUser1",
    data() {
      return {
        //服务器地址
        base_url: "",
        //数据对象id
        dataObjectId:999,
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
            pageSize: 50
          },
          //数据
          data: []
        },
        //接口信息 *need
        //数据搜索功能
        viewSearch: {
          data: {
            id:""
            ,
            username:""
            ,
            password:""
            ,
            mobile:""
            ,
            name:""
            ,
            userSex:""
            ,
            company:""
            ,
            dept:""
            ,
            neUsername:""
            ,
            wxid:""

          },
          show: false
        },
        //数据新增功能
        viewAdd: {
          data: {

          }
          ,
          show: false
        }
        ,
        //数据修改功能
        viewEdit: {
          index: "",
          data
            :
            "",
          show
            :
            false
        }
        ,
        //数据删除功能
        viewDelet: {
          show: false,
          item
            :
            {
            }
          ,
          index: ""
        }
        ,
        select:{
        }
        ,
        dataList:[]
      }
    },
    created() {
      this.getTableData({pageInfo: this.viewTable.pageInfo, dataObjectId: this.dataObjectId, condition: []});
    },
    mounted(){
    },
    methods: {
      //表格操作
      /**
       * @function () handleEdit(item)
       * @description 表格 修改弹窗
       * @param {Object} item 表格一行数据
       * @param {String} index 数据第几项
       */
      handleEdit(item, index)
      {
        console.log("edit", item, index);
        this.viewEdit.data = Object.assign({}, item);
        this.viewEdit.old = Object.assign({}, item);
        this.viewEdit.index = index;
        this.viewEdit.show = true;
      }
      ,
      /**
       * @function () editSingle()
       * @description 修改单项
       */
      editSingle()
      {
        axios.post('/data/update', {
          dataObjectId: this.dataObjectId,
          data: this.filterNumber(this.viewEdit.data),
          condition: [
            {key: 'id', condition: 'equals', value: this.viewEdit.old.id},
            {key: 'username', condition: 'equals', value: this.viewEdit.old.username},
            {key: 'password', condition: 'equals', value: this.viewEdit.old.password},
            {key: 'mobile', condition: 'equals', value: this.viewEdit.old.mobile},
            {key: 'name', condition: 'equals', value: this.viewEdit.old.name},
            {key: 'userSex', condition: 'equals', value: this.viewEdit.old.userSex},
            {key: 'company', condition: 'equals', value: this.viewEdit.old.company},
            {key: 'dept', condition: 'equals', value: this.viewEdit.old.dept},
            {key: 'neUsername', condition: 'equals', value: this.viewEdit.old.neUsername},
            {key: 'wxid', condition: 'equals', value: this.viewEdit.old.wxid}
          ]
        })
          .then(res => {
            if(res.data.success
            )
            {
              Message.success("修改成功");
              this.getTableData({
                pageInfo: this.viewTable.pageInfo,
                condition: this.changeParams(this.viewSearch.data),
                dataObjectId: this.dataObjectId
              });
            }
            else
            {
              Message.error('修改失败。')
            }
          }).
        catch(err => {Message.error(err.data.message)
        })
        this.viewEdit.show = false;
      }
      ,
      /**
       * @function () handleDelet(item)
       * @description 表格 修改数据
       * @param {Object} item 表格一行数据
       */
      handleDelet(item, index)
      {
        console.log("delet", item);
        this.viewDelet.item = item;
        this.viewDelet.old = Object.assign({}, item);
        this.viewDelet.index = index;
        this.viewDelet.show = true;
      }
      ,
      /**
       * @function () deleteSingle()
       * @description 删除单项
       */
      deletSingle()
      {
        axios.post('/data/delete', {
          dataObjectId: this.dataObjectId,
          condition: [
            {key: 'id', condition: 'equals', value: this.viewDelet.old.id},
            {key: 'username', condition: 'equals', value: this.viewDelet.old.username},
            {key: 'password', condition: 'equals', value: this.viewDelet.old.password},
            {key: 'mobile', condition: 'equals', value: this.viewDelet.old.mobile},
            {key: 'name', condition: 'equals', value: this.viewDelet.old.name},
            {key: 'userSex', condition: 'equals', value: this.viewDelet.old.userSex},
            {key: 'company', condition: 'equals', value: this.viewDelet.old.company},
            {key: 'dept', condition: 'equals', value: this.viewDelet.old.dept},
            {key: 'neUsername', condition: 'equals', value: this.viewDelet.old.neUsername},
            {key: 'wxid', condition: 'equals', value: this.viewDelet.old.wxid}
          ]
        })
          .then(res => {
            if(res.data.success
            )
            {
              Message.success("删除成功");
              this.getTableData({
                pageInfo: this.viewTable.pageInfo,
                condition: this.changeParams(this.viewSearch.data),
                dataObjectId: this.dataObjectId
              });
            }
            else
            {
              Message.error('删除失败')
            }
          }).
        catch(err => {Message.error(err.data.message)
        })
        this.viewDelet.show = false;
      }
      ,

      /**
       * @function () handleDelet(item)
       * @description 表格 修改数据
       * @param {Object} item 表格一行数据
       */
      handleAdd(item)
      {
        console.log("添加新成员");
        this.viewAdd.show = true;
      }
      ,
      /**
       * @function () addeSingle()
       * @description 添加单项
       */
      addSingle()
      {
        var params = Object.assign({}, this.viewAdd.data);

        axios.post('/data/add', {
          dataObjectId: this.dataObjectId,
          data: this.filterNumber(params)
        })
          .then(res => {
            if(res.data.success
            )
            {
              Message.success("添加成功");
              this.viewTable.data.push(params);
            }
            else
            {
              Message.error('添加失败。')
            }
          }).
        catch(err => {Message.error(err.data.message)
        })
        for (var i in this.viewAdd.data) {
          this.viewAdd.data[i] = "";
        }
        this.viewAdd.show = false;
      }
      ,
      // 搜索 得到表格数据
      handleSearch()
      {
        this.getTableData({
          pageInfo: this.viewTable.pageInfo,
          condition: this.changeParams(this.viewSearch.data),
          dataObjectId: this.dataObjectId
        });
        this.viewSearch.show = false;
        this.viewSearch.data = {};
      }
      ,
      getTableData(params)
      {
        var that = this;
        axios.post('/data/retrieve', params)
          .then(res => {
            if(res.data.success
            )
            {
              that.viewTable.data = res.data.data.rtnData;
              that.viewTable.filter = {};
              for (var index in this.viewTable.data[0]) {
                that.viewTable.filter[index] = typeof ( that.viewTable.data[0][index]);
              }

            }
            else
            {
              Message.error('查询表格数据错误' + res.data.message)
            }
          }).
        catch(err => {Message.error(err.data.message);
        })
        ;
      }
      ,
      //分页
      handleSizeChange(val)
      {
        this.viewTable.pageInfo.page = 1;
        this.viewTable.pageInfo.pageSize = val;
        handleSearch();
      }
      ,
      handleCurrentChange(val)
      {
        handleSearch();
      }
      ,
      //转换传参格式
      changeParams(params)
      {
        var condition = [];
        for (var index in params) {
          var obj = {};
          console.log("params【index】",params[index]);
          if(params[index]===""||params[index]===undefined||params[index]===null){
            continue
          }else{
            obj['key'] = index;
            obj['condition'] = 'equals';
            if (this.viewTable.filter[index]=="number"){
              obj['value'] =parseInt( params[index]);
            } else{
              obj['value'] = params[index];
            }
            condition.push(obj);
          }
        }
        return condition;
      },
      //判断格式 返回数字类型
      filterNumber(data){
        for(var i in data){
          if (this.viewTable.filter[i]=="number"){
            data[i] = parseInt(data[i]);
          }
        }
        return data;
      }
    }
  }
</script>
