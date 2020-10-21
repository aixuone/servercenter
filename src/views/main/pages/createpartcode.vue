<template>
  <div class="resource">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <div class="breadxian"></div>
      <el-breadcrumb-item>代码片段生成</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="breadbottom"></div>
    <h3>基于数据服务</h3>
    <br>
    <br>
    <br>
    <el-form inline :model="view.data" label-position="right" label-width="100px">
      <el-form-item label="资源类型" prop="source">
        <el-select v-model="view.data.source" placeholder="请选择" @change="changeModelList">
          <el-option
            v-for="item in view.sources"
            :label="item.name"
            :value="item.id"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="资源目录" prop="modelName">
        <el-select v-model="view.data.modelName" placeholder="请选择">
          <el-option v-for="item in view.list" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <div style="margin: 10px 0;"></div>
      <el-form-item label="模板片段">
        <el-input
          type="textarea"
          autosize
          placeholder="请输入内容"
          v-model="view.data.template"
          style="width: 800px;"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="confirm">生成代码</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="代码展示" :visible.sync="view.show" width="60%" id="viewDS">
      <el-form :model="view" label-position="right" label-width="130px">
        <el-form-item label="生成结果">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="view.partCode"
            style="width: 800px;"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="view.show = false">关闭</el-button>
      </div>
    </el-dialog>
    <br>
    <br>
    <br>
    <h3>基于数据库</h3>
    <br>
    <br>
    <br>
    <el-form inline :model="viewDb.data" label-position="right" label-width="100px">
      <!-- <el-form-item label="模块名">
        <el-input v-model="viewDb.data.modelName" placeholder="请输入模块名"></el-input>
      </el-form-item>-->
      <el-form-item label="数据库地址">
        <el-input v-model="viewDb.data.url" placeholder="请输入数据库地址"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="viewDb.data.user" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="viewDb.data.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getTables">查询表集合</el-button>
      </el-form-item>
      <el-form-item label="数据表集合" prop="tableNames">
        <el-select v-model="viewDb.data.tableNames" placeholder="请选择">
          <el-option v-for="(item,index) in viewDb.list" :label="item" :value="item" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <div style="margin: 10px 0;"></div>
      <el-form-item label="模板片段">
        <el-input
          type="textarea"
          autosize
          placeholder="请输入内容"
          v-model="viewDb.data.template"
          style="width: 800px;"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="generate">生成代码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "@/libs/axios";
import api from "@/api/data-model/data";
import { Message } from "element-ui";

export default {
  name: "createpartcode",
  data() {
    return {
      //服务器地址
      // base_url: "http://smart.tygps.com:13355/createpartcode",
      base_url: "http://localhost:19081",
      //数据搜索功能
      view: {
        data: {
          source: "",
          modelName: "",
          template: ""
        },
        list: [],
        sources: [
          { id: 0, name: "数据服务" },
          { id: 1, name: "DWF" }
          // ,
          // { id: 2, name: "数据库" }
        ],
        partCode: "",
        show: false
      },
      viewDb: {
        data: {
          modelName: "",
          tableNames: "",
          template: "",
          user: "root",
          url: "jdbc:mysql://localhost:13306/hmserver?zeroDateTimeBehavior=convertToNull&autoReconnect=true&useSSL=true&useUnicode=true&characterEncoding=UTF-8",
          password: "root"
        },
        list: [],
        show: false
      }
    };
  },
  created() {
    // this.tables();
  },
  methods: {
    tables(modelUrl) {
      axios
        .post(modelUrl, {
          type: "",
          isDic: "",
          name: "",
          pageInfo: {
            page: 0,
            pageSize: 0
          }
        })
        .then(res => {
          if (res.data.success) {
            this.view.list = res.data.data.list;
            this.view.data.modelName = null;
          }
        });
    },
    changeModelList(source) {
      // 加载资源目录
      var modelUrl = this.base_url;
      if (source == 0) {
        modelUrl = modelUrl + "/data/object/list";
      } else if (source == 1) {
        modelUrl = modelUrl + "/data/object/listDwf";
      }
      this.tables(modelUrl);
    },
    confirm() {
      if (
        this.view.data.source == null ||
        this.view.data.modelName == null ||
        this.view.data.template == ""
      ) {
        Message.error("请填写完整！");
        return;
      }
      // this.view.show = true;
      this.gen();
    },
    gen() {
      // 数据服务
      var attributeUrl = this.base_url;
      if (this.view.data.source == 0) {
        attributeUrl = attributeUrl + "/data/object/attribute/list";
      } else if (this.view.data.source == 1) {
        attributeUrl = attributeUrl + "/data/object/attribute/listDwf";
      }
      axios
        .post(attributeUrl, {
          resId: this.view.data.modelName,
          pageInfo: {
            page: 0,
            pageSize: 0
          }
        })
        .then(res => {
          if (res.data.success) {
            var stringObj = JSON.stringify(res.data.data);
            var params = {
              source: this.view.data.source,
              modelName: "" + this.view.data.modelName,
              template: this.view.data.template,
              objectList: stringObj.replace('"', "'")
            };
            this.genDataCenter(params);
          }
        })
        .catch(err => {
          Message.error("网络错误。");
        });
    },
    genDataCenter(params) {
      axios
        .post("http://localhost:19062/generate/code/part", params)
        .then(resp => {
          if (resp.data.success) {
            this.view.show = true;
            this.view.partCode = resp.data.data.partCode;
            Message.success("生成代码片段成功");
          } else {
            Message.success("生成代码片段失败" + res.data.message);
          }
        })
        .catch(err => {
          Message.error("生成代码片段失败，网络错误。");
        });
    },
    getTables() {
      console.log("sssssssssss" + this.viewDb.data.user);
      if (
        this.viewDb.data.user == "" ||
        this.viewDb.data.url == "" ||
        this.viewDb.data.password == ""
      ) {
        Message.error("请填写完整！");
        return;
      }
      this.viewDb.show = true;
      axios
        .post("http://localhost:19062/gen/table", {
          user: this.viewDb.data.user,
          url: this.viewDb.data.url,
          password: this.viewDb.data.password
        })
        .then(res => {
          if (res.data.success) {
            this.viewDb.list = res.data.data;
            console.log("list" + this.viewDb.list);
            Message.success("连接数据库成功");
          } else {
            Message.success("连接数据库失败" + res.data.message);
          }
        })
        .catch(err => {
          Message.error("生成代码失败，网络错误。");
        });
    },
    generate() {
      var params = {
        tableName: this.viewDb.data.tableNames,
        user: this.viewDb.data.user,
        url: this.viewDb.data.url,
        password: this.viewDb.data.password
      };
      axios
        .post(this.base_url + "/data/object/attribute/listDb", params)
        .then(res => {
          if (res.data.success) {
            var stringObj = JSON.stringify(res.data.data);
            var params = {
              source: 2,
              modelName: this.viewDb.data.tableNames,
              template: this.viewDb.data.template,
              objectList: stringObj.replace('"', "'")
            };
            this.genDataCenter(params);
          } else {
            Message.success("生成代码失败" + res.data.message);
          }
        })
        .catch(err => {
          Message.error("网络错误。");
        });
    }
  }
};
</script>
