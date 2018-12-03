<template>
  <div class="resource">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <div class="breadxian"></div>
      <el-breadcrumb-item>代码生成</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="breadbottom"></div>
    <h3>基于数据服务</h3>
    <br/><br/><br/>
    <el-form inline :model="view.data" label-position="right" label-width="80px">
      <el-form-item label="作者姓名">
        <el-input v-model="view.data.name" placeholder="输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="包名">
        <el-input v-model="view.data.packageName" placeholder="请输入包名"></el-input>
      </el-form-item>
      <el-form-item label="模块名">
        <el-input v-model="view.data.modelName" placeholder="请输入模块名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="confirm">确定</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="生成代码" :visible.sync="view.show" width="30%" id="viewDS">
      <el-form :model="view.data" label-position="right" label-width="130px">
        <el-form-item label="资源目录" prop="tableNames">
          <el-select v-model="view.data.index" placeholder="请选择">
            <el-option v-for="(item,index) in view.list" :label="item.name" :value="index" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="表说明">
          <el-input v-model="view.data.tableAnnotation" placeholder="表说明"></el-input>
        </el-form-item>
        <el-form-item label="保存路径">
          <el-input v-model="view.data.diskPath" placeholder="保存路径"></el-input>
        </el-form-item>

        <el-form-item label="选择文件类型" prop="files">
          <el-checkbox-group v-model="view.data.files">
            <p><el-checkbox label="Vue"></el-checkbox></p>
            <p><el-checkbox label="Controller"></el-checkbox></p>
            <p><el-checkbox label="impl&service"></el-checkbox></p>
            <!--<el-checkbox label="dao" value="Dao.java"></el-checkbox>-->
            <!--<el-checkbox label="mapper" value="Mapper.xml"></el-checkbox>-->
            <!--<el-checkbox label="entity" value=".java"></el-checkbox>-->
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="view.show = false">取消</el-button>
        <el-button type="primary" @click="gen()">生成代码</el-button>
      </div>
    </el-dialog>
    <br/><br/><br/>
    <h3>基于数据库</h3>
    <br/><br/><br/>
    <el-form inline :model="viewDb.data" label-position="right" label-width="100px" >
      <el-form-item label="作者姓名">
        <el-input v-model="viewDb.data.name" placeholder="输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="包名">
        <el-input v-model="viewDb.data.packageName" placeholder="请输入包名"></el-input>
      </el-form-item>
      <el-form-item label="模块名">
        <el-input v-model="viewDb.data.modelName" placeholder="请输入模块名"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="viewDb.data.user" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="数据库地址">
        <el-input v-model="viewDb.data.url" placeholder="请输入数据库地址"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="viewDb.data.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getTables()">确定</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="生成代码" :visible.sync="viewDb.show" width="30%" id="viewDB">
      <el-form :model="viewDb.data" label-position="right" label-width="120px">
        <el-form-item label="数据表" prop="tableNames">
          <el-select v-model="viewDb.data.tableNames" placeholder="请选择">
            <el-option v-for="(item,index) in viewDb.list" :label="item" :value="item" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="表说明">
          <el-input v-model="viewDb.data.tableAnnotation" placeholder="表说明"></el-input>
        </el-form-item>
        <el-form-item label="保存路径">
          <el-input v-model="viewDb.data.diskPath" placeholder="保存路径"></el-input>
        </el-form-item>

        <el-form-item label="选择文件类型" prop="files">
          <el-checkbox-group v-model="viewDb.data.files">
            <p><el-checkbox label="Vue"></el-checkbox></p>
            <p><el-checkbox label="Controller"></el-checkbox></p>
            <p><el-checkbox label="impl&service"></el-checkbox></p>
            <p><el-checkbox label="dao"></el-checkbox></p>
            <p><el-checkbox label="mapper"></el-checkbox></p>
            <p><el-checkbox label="entity"></el-checkbox></p>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="viewDb.show = false">取消</el-button>
        <el-button type="primary" @click="generate()">生成代码</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import axios from "@/libs/axios";
  import api from "@/api/data-model/data";
  import {Message} from 'element-ui';

  export default {
    name: "createcode",
    data() {
      return {
        //服务器地址
        base_url: "http://localhost:19081",
        //数据搜索功能
        view: {
          data: {
            name: "",
            packageName: "",
            modelName: "",
            tableNames: "",
            tableAnnotation: "",
            diskPath: "",
            files: []
          },
          list: [],
          show: false
        },
        viewDb: {
          data: {
            name: "",
            packageName: "",
            modelName: "",
            tableNames: "",
            tableAnnotation: "",
            diskPath: "",
            files: [],
            user: "",
            url: "",
            password: ""
          },
          list: [],
          show: false
        }
      }
    },
    created() {
      this.tables();
    },
    methods: {
      tables() {
        axios.post(this.base_url + '/data/object/list',
          {
            type: '',
            isDic: '',
            name: '',
            pageInfo: {
              page: 0,
              pageSize: 0
            }
          })
          .then(res => {
            if (res.data.success) {
              this.view.list = res.data.data.list;
            }
          })
      },
      confirm(){
        if(this.view.data.author == '' || this.view.data.packageName == '' || this.view.data.modelName == ''){
          Message.error("请填写完整！");
          return;
        }
        this.view.show=true;
      },
      gen() {
        var obj = this.view.list[this.view.data.index];
        console.log("files:" + this.view.data.files);
        for (var i in this.view.data.files) {
          switch (this.view.data.files[i]) {
            case "Vue":
              this.view.data.files[i] = ".vue";
              break;
            case "Controller":
              this.view.data.files[i] = "Controller.java";
              break;
            case "impl&service":
              this.view.data.files[i] = "ServiceImpl.java";
              this.view.data.files.push("Service.java");
              break;
          }
        }
        axios.post(this.base_url + '/data/object/attribute/list',
          {
            resId: obj.id,
            pageInfo: {
              page: 0,
              pageSize: 0
            }
          })
          .then(res => {
            if (res.data.success) {
              var stringObj = JSON.stringify(res.data.data);
              var params = {
                resId: obj.id,
                suffixs: this.view.data.files,
                author: this.view.data.name,
                tableAnnotation: this.view.data.tableAnnotation,
                tableName: obj.defined,
                diskPath: this.view.data.diskPath,
                packageName: this.view.data.packageName,
                modelName: this.view.data.modelName,
                isDic: obj.isDic,
                objectList: stringObj.replace("\"", "\'")
              }
              console.log("params", params);
              axios.post('http://localhost:8081/generate/code/res', params
              )
                .then(resp => {
                  if (resp.data.success) {
                    Message.success("生成代码成功");
                  } else {
                    Message.success("生成代码失败"+res.data.message);
                  }
                }).catch(err => {
                Message.error('生成代码失败，网络错误。')
              });
            }
          }).catch(err => {
          Message.error('网络错误。')
        });
      },
      generate() {
        console.log("Dbfiles:" + this.viewDb.data.files);
        for (var i in this.viewDb.data.files) {
          switch (this.viewDb.data.files[i]) {
            case "Vue":
              this.viewDb.data.files[i] = ".vue";
              break;
            case "Controller":
              this.viewDb.data.files[i] = "Controller.java";
              break;
            case "impl&service":
              this.viewDb.data.files[i] = "ServiceImpl.java";
              this.viewDb.data.files.push("Service.java");
              break;
            case "dao":
              this.viewDb.data.files[i] = "Dao.java";
              break;
            case "mapper":
              this.viewDb.data.files[i] = "Mapper.java";
              break;
            case "entity":
              this.viewDb.data.files[i] = ".java";
              break;
          }
        }
        var params = {
          suffix: this.viewDb.data.files,
          author: this.viewDb.data.name,
          tableAnnotation: this.viewDb.data.tableAnnotation,
          tableName: this.viewDb.data.tableNames,
          diskPath: this.viewDb.data.diskPath,
          packageName: this.viewDb.data.packageName,
          modelName: this.viewDb.data.modelName,
          user: this.viewDb.data.user,
          url:this.viewDb.data.url,
          password:this.viewDb.data.password
        }
        axios.post('http://localhost:8081/gen/code', params)
          .then(resp => {
            if (resp.data.success) {
              Message.success("生成代码成功");
            } else {
              Message.success("生成代码失败"+res.data.message);
            }
          }).catch(err => {
          Message.error('网络错误。')
        });
      },
      getTables() {
        console.log("sssssssssss"+this.viewDb.data.user);
        if(this.viewDb.data.user == '' || this.viewDb.data.url == '' || this.viewDb.data.password == ''){
          Message.error("请填写完整！");
          return;
        }
        this.viewDb.show = true;
        axios.post('http://localhost:8081/gen/table',
          {
            user: this.viewDb.data.user,
            url:this.viewDb.data.url,
            password:this.viewDb.data.password
          }).then(res=>{
          if (res.data.success) {
            this.viewDb.list = res.data.data;
            console.log("list"+this.viewDb.list);
            Message.success("连接数据库成功");
          } else {
            Message.success("连接数据库失败"+res.data.message);
          }
        })
          .catch(err => {
            Message.error('生成代码失败，网络错误。')
          });

      }
    }
  }
</script>
