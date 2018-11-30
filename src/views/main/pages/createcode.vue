<template>
  <div class="resource">
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
        <el-button type="primary" @click="view.show=true">确定</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="生成代码" :visible.sync="view.show" width="30%" id="viewSearch">
      <el-form :model="view.data" label-position="right" label-width="120px">
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
          <el-select v-model="view.data.files" placeholder="请选择">
            <el-option label="Vue" value=".vue"></el-option>
            <el-option label="Controller" value="Controller.java"></el-option>
            <el-option label="impl" value="ServiceImpl.java"></el-option>
            <el-option label="service" value="Service.java"></el-option>
            <el-option label="dao" value="Dao.java"></el-option>
            <el-option label="mapper" value="Mapper.xml"></el-option>
            <el-option label="entity" value=".java"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="view.show = false">取消</el-button>
        <el-button type="primary" @click="gen()">生成代码</el-button>
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
        base_url: "http://127.0.0.1:19081",
        //数据搜索功能
        view: {
          data: {
            name: "",
            packageName: "",
            modelName: "",
            tableNames: "",
            tableAnnotation: "",
            diskPath: "",
            files: ""
          },
          list:[],
          show: false
        }
      }
    },
    created() {
      this.tables();
      console.log("aaaa");
    },
    methods: {
      tables() {
        axios.post(this.base_url + '/data/object/list',
          {
            type:'',
            isDic:'',
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
      gen() {
        var obj = this.view.list[this.view.data.index];
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
                objectList:stringObj.replace("\"","\'")
              }
              console.log("params",params);
              axios.post( 'http://127.0.0.1:8081/generate/code/res',params
                )
                .then(resp => {
                  if (resp.data.success) {
                    Message.success("生成代码成功");
                  } else {
                    Message.success("生成代码失败");
                  }
                }).catch(err => {
                Message.error('生成代码失败，网络错误。')
              });
            }
          }).catch(err => {
          Message.error('网络错误。')
        });
      }
    }
  }
</script>
