<template>
<el-container class="login-box">
     <el-header class="login-title">登陆系统</el-header>
     <el-main>
        <el-form class="forms">
             <el-form-item label="用户名" class="user-input">
                <el-input type="password" v-model="username" auto-complete="off" placeholder="请输入用户名"></el-input>
             </el-form-item>
            <el-form-item label="密码" class="user-input">
                <el-input type="password" v-model="password" auto-complete="off" placeholder="请输入密码"></el-input>
             </el-form-item>
           <el-form-item class="login-btn-box">
                <el-button type="primary" class="login-btn" @click="loginBtn">登陆</el-button>
           </el-form-item>
        </el-form>  
     </el-main>
</el-container>
    
</template>

<script>
export default{
   data(){
       return {
           username:"",
           password:""
       }
   },
   methods:{
       loginBtn(){
           console.log(this.username);
           console.log(this.password);
       }
   }


}

</script>
