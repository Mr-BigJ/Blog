<template>
  <div class="login">
    <!-- <el-container> -->
      

    <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm aaa" >
      <el-form-item label="用户名" prop="name" >
        <el-input type="text" v-model="username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loginMethod">登录</el-button>
        <el-button type="primary" @click="dialogVisible = true">注册</el-button>
      </el-form-item>
    </el-form>



        

        <el-dialog title="用户注册" :visible.sync="dialogVisible" width="30%">
          <el-form :model="form">
            <el-form-item label="账号" label-width="80px">
              <el-input v-model="form.username" autocomplete="off"></el-input>
              <span style="color:red">{{hasSame}}</span>
            </el-form-item>
            <el-form-item label="密码" label-width="80px">
              <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" label-width="80px">
              <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <span style="color: red">{{ loginMsg }}</span>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="register">确 定</el-button>
          </div>
        </el-dialog>
      <!-- </el-main> -->
    <!-- </el-container> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "login",
  components: {
    axios,
  },
  data() {
    return {
      username: "",
      password: "",
      loginMsg: "",
      dialogVisible: false,
      form: {
        username: "",
        email: "",
        password: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
      hasSame:''
    };
  },
  methods: {
    loginMethod(){
      var loginData = new FormData();
      loginData.append("username", this.username);
      loginData.append("password", this.password);
      
      this.$axs
        .post("http://localhost:8878/pro/user/login", loginData)
        .then((val) => {
          console.log(val)
          if (val.msg === "登录成功") {
            localStorage.setItem("token", val.data.token)
            this.$store.commit("userDetail/storageUser",val.data)
            localStorage.setItem("user", JSON.stringify( val.data))
            setTimeout(()=>{
              window.location.href = 'http://localhost:8080/#/blogList'
            },1000)
 
          }else{
            this.loginMsg = "账号密码错误";
          }
        })
        

    },

    register(){
      var loginData = new FormData();
      loginData.append("username", this.form.username);
      loginData.append("password", this.form.password);
      loginData.append("email", this.form.email);

      this.$axs
        .post("http://localhost:8878/pro/user/register", loginData)
        .then((val) => {
          if (val.code === 200) {
            alert("注册成功")
            this.dialogVisible = false
            localStorage.setItem("token",val.data)
            this.$store.commit("blogToken/storageToken",val.data)
          }else if(val.msg === '已存在的用户名'){
            this.hasSame = '已存在的用户名'
          }
        })
        
    },
  },
  mounted(){
    if(localStorage.getItem("token") != ""){
      this.$router.push('/blogList')
    }
  }
};
</script>

<style scoped>


  /*设置样式*/
 .demo-ruleForm{
   border: 1px solid #DCDFE6;
   width: 350px;
   margin: 180px auto;
   padding: 35px 120px 15px 25px;
   border-radius: 5px;
   -webkit-border-radius: 5px;
   -moz-border-radius: 5px;
   box-shadow: 0 0 25px #909399;
 }

/* 背景图片*/
  .login{
    background:url("../assets/car1.jpeg");
    width: 100%;
    height: 100%;
    position:fixed;
    margin-top: -5px;/*上边距*/
    margin-left: -7px;/*左边距*/
    background-size:100% 100%;
    }

  /* 背景图片*/
  .aaa{
    background:url("../assets/bg.gif");
    width: 20%;
    height: 24%;
    position:center;
    margin-top: center;/*上边距*/
    margin-left:center;/*左边距*/
    background-size:100% 100%;
  }


</style>