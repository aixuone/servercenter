<template>
  <div id="app">
      <h1><i class="pic"></i> {{title}}</h1>
      <table>
          <thead>
              <tr>
                  <th></th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <th></th>
              </tr>
          </tbody>
          <tfoot>
              <tr>
                  <th></th>
              </tr>
          </tfoot>
      </table>
    <form
        :id="formId"
        @submit="checkForm"
        :action="action"
        :method="method"
        >

        <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
            <li v-for="(error,index) in errors" :key="index">{{ error }}</li>
            </ul>
        </p>

        <p>
            <label :for="formData.product.name">{{formData.product.label}}：</label>
            <input
            :id="formData.product.id" 
            v-model="formData.product.value"
            :name="formData.product.name"
            type="text"
            >
        </p>

        <p>
            <label :for="formData.date.name">{{formData.date.label}}：</label>
            <input
            :id="formData.date.id"
            v-model="formData.date.value"
            :name="formData.date.name"
            type="date"
            >
        </p>

        <p>
            <label :for="formData.size.name">{{formData.size.label}}:</label>
            <select
            :id="formData.size.id"
            v-model="formData.size.value"
            :name="formData.size.name"
            >
            <option v-for="(item,index) in formData.size.options" :value="item.value" :key="index">{{item.txt}}</option>
            </select>
        </p>

        <p>
            <input type="submit" value="Submit">
        </p>

        </form>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return{
        //表单DOm id
        formId:"formID",
        //表单标题
        title:"产品调查表",
        // 表单提交方式
        method:"get",
        // 表单提交地址
        action:"/",
        // 错误信息列表
        errors: [],
        //主题
        theme:{
            path:'./assets/themes',
            name:'theme1'
        },
        //表单项 内容
        formData:{
            product: {
                id:"dom1",
                class:"",
                label:"产品",
                name:"product",
                value:"",
            },
            date: {
                id:"dom2",
                class:"",
                label:"出厂日期",
                name:"date",
                value:"",
            },
            size: {
                id:"dom3",
                class:"",
                label:"型号",
                name:"size",
                value:"",
                options:[
                    {txt:'请选择',value:null},
                    {txt:"小",value:"small"},
                    {txt:"中",value:"middle"},
                    {txt:"大",value:"large"}
                ]
            }
        }
    }
  },
  created() {
      //获取主题样式表
      this.getTheme(this.theme.path,this.theme.name);
  },
  methods:{
      //校验表单
    checkForm(e) {
        if (this.formData.product.value && this.formData.date.value) {
            return true;
      }

      this.errors = [];

      if (!this.formData.product.value) {
          this.errors.push('请填写产品名称！');
      }
      if (!this.formData.date.value) {
          this.errors.push('请填写出厂日期!');
      }

      e.preventDefault();
    },
    /**
     * @function {} getTheme(path , themeName)
     * @description 获取主题样式表，文件类型为less
     * @param {String} path 主题文件夹路径
     * @param {String} themeName 主题名称 
     */
    getTheme(path , themeName) {
        if (!path||!themeName) {
            console.log("没有加载主题");
            return false;
        }
        console.log(path+'/'+themeName+'/index.less');
        
        // require(path+'/'+themeName+'/index.less');
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
