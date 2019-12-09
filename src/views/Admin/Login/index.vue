<template>
  <div id="Login">
    <div class="page">
      <div class="page-container">
        <h1>后台管理</h1>
        <el-form :model="adminForm" :rules="loginRules" ref="adminForm" label-width="0px" label-position="left">
          <el-form-item label="" prop="username" class="label">
            <el-input type="text" v-model="adminForm.username" autocomplete="off" placeholder="请输入用户名" class="input"></el-input>
          </el-form-item>
          <el-form-item label="" prop="password" class="label">
            <el-input type="password" v-model="adminForm.password" autocomplete="off" placeholder="请输入密码" show-password class="input"></el-input>
          </el-form-item>
        </el-form>
        <el-button :loading="loading" type="button" @click="adminLogin('adminForm')">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Login",
        data(){
            return{
                loading: false,
                //登录表单
                adminForm:{
                  username: 'admin',
                  password: '123456'
                },
                imgurl: require('../../../static/background/Admin/Login/adminLoginBackPic.jpg'),
                options:{
                    text: '正在登录',
                    // spinner: "el-icon-loading",
                    lock: true,
                    background: "rgba(0, 0, 0, 0.8)"
                },
                //表单校验规则
                loginRules:{
                    username:[
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
                    ],
                    password:[
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ]
                }
            };
        },
        methods:{
            //管理员登录
            adminLogin(adminForm){
                let that = this;
                this.loading = true;
                that.$refs[adminForm].validate((valid) => {
                    if(valid){
                        //let loading = that.$loading.service(that.options);
                        let password = that.$aes.encrypt(that.adminForm.password);

                        that.$axios.post(that.$api.adminInfo.login,{
                            username: that.adminForm.username,
                            password: password
                        }).then(res => {
                            that.loading = false;
                            if(res.data.code === 200){
                                //登录成功,设置cookie
                                that.$store.commit("saveAdminToken",{"adminName":that.adminForm.username,"adminToken":res.headers['authorization']});
                                that.$router.replace({path:'/admin/index'});
                            }
                            // setTimeout(function () {
                            //     //loading.close();
                            //     that.loading = false;
                            //     if(res.data.code === 200){
                            //         //登录成功,设置cookie
                            //         that.$store.commit("saveAdminToken",{"adminName":that.adminForm.username,"adminToken":that.adminForm.username});
                            //         that.$router.replace({path:'/admin/index'});
                            //     }
                            // },500);
                        }).catch(res =>{
                            that.loading = false;
                            //loading.close();
                            console.log(res)
                        })
                    }
                });
            }
        }
    }
</script>
<style>
  .input .el-input__inner {
    /*width: 270px;*/
    height: 42px;
    padding: 0 15px;
    background: #2d2d2d; /* browsers that don't support rgba */
    background: rgba(45,45,45,.15);
    -moz-border-radius: 6px;
    -webkit-border-radius: 6px;
    border-radius: 6px;
    border: 1px solid #3d3d3d; /* browsers that don't support rgba */
    border: 1px solid rgba(255,255,255,.15);
    -moz-box-shadow: 0 2px 3px 0 rgba(0,0,0,.1) inset;
    -webkit-box-shadow: 0 2px 3px 0 rgba(0,0,0,.1) inset;
    box-shadow: 0 2px 3px 0 rgba(0,0,0,.1) inset;
    font-family: 'PT Sans', Helvetica, Arial, sans-serif;
    font-size: 14px;
    color: #fff;
    text-shadow: 0 1px 2px rgba(0,0,0,.1);
    -o-transition: all .2s;
    -moz-transition: all .2s;
    -webkit-transition: all .2s;
    -ms-transition: all .2s;
  }

  .input .el-input__inner:-moz-placeholder { color: #fff; }
  .input .el-input__inner:-ms-input-placeholder { color: #fff; }
  .input .el-input__inner::-webkit-input-placeholder { color: #fff; }

  .input .el-input__inner:focus {
    outline: none;
    -moz-box-shadow:
      0 2px 3px 0 rgba(0,0,0,.1) inset,
      0 2px 7px 0 rgba(0,0,0,.2);
    -webkit-box-shadow:
      0 2px 3px 0 rgba(0,0,0,.1) inset,
      0 2px 7px 0 rgba(0,0,0,.2);
    box-shadow:
      0 2px 3px 0 rgba(0,0,0,.1) inset,
      0 2px 7px 0 rgba(0,0,0,.2);
  }
  .label .el-form-item__label{
    color: #000;
  }
</style>

<style lang="scss" scoped>
  #Login{
    background-image: url('~@/static/background/Admin/Login/adminLoginBackPic.jpg');
    background-size: cover;
    background-position: center center;
    height: 100%;
    position: fixed;
    width: 100%
  }
  .page {
    -webkit-font-smoothing: antialiased;
    font-weight: 300;
    font-family: 'PT Sans', Helvetica, Arial, sans-serif;
    text-align: center;
    color: #fff;
  }

  .page-container {
    margin: 120px auto 0 auto;
  }

  h1{
    font-size: 30px;
    font-weight: 700;
    text-shadow: 0 1px 4px rgba(0,0,0,.2);
  }

  .el-form{
    position: relative;
    width: 350px;
    margin: 45px auto 0 auto;
    text-align: center;
  }

  /*input {*/
  /*  width: 270px;*/
  /*  height: 42px;*/
  /*  margin-top: 25px;*/
  /*  padding: 0 15px;*/
  /*  background: #2d2d2d; !* browsers that don't support rgba *!*/
  /*  background: rgba(45,45,45,.15);*/
  /*  -moz-border-radius: 6px;*/
  /*  -webkit-border-radius: 6px;*/
  /*  border-radius: 6px;*/
  /*  border: 1px solid #3d3d3d; !* browsers that don't support rgba *!*/
  /*  border: 1px solid rgba(255,255,255,.15);*/
  /*  -moz-box-shadow: 0 2px 3px 0 rgba(0,0,0,.1) inset;*/
  /*  -webkit-box-shadow: 0 2px 3px 0 rgba(0,0,0,.1) inset;*/
  /*  box-shadow: 0 2px 3px 0 rgba(0,0,0,.1) inset;*/
  /*  font-family: 'PT Sans', Helvetica, Arial, sans-serif;*/
  /*  font-size: 14px;*/
  /*  color: #fff;*/
  /*  text-shadow: 0 1px 2px rgba(0,0,0,.1);*/
  /*  -o-transition: all .2s;*/
  /*  -moz-transition: all .2s;*/
  /*  -webkit-transition: all .2s;*/
  /*  -ms-transition: all .2s;*/
  /*}*/

  /*input:-moz-placeholder { color: #fff; }*/
  /*input:-ms-input-placeholder { color: #fff; }*/
  /*input::-webkit-input-placeholder { color: #fff; }*/

  /*input:focus {*/
  /*  outline: none;*/
  /*  -moz-box-shadow:*/
  /*    0 2px 3px 0 rgba(0,0,0,.1) inset,*/
  /*    0 2px 7px 0 rgba(0,0,0,.2);*/
  /*  -webkit-box-shadow:*/
  /*    0 2px 3px 0 rgba(0,0,0,.1) inset,*/
  /*    0 2px 7px 0 rgba(0,0,0,.2);*/
  /*  box-shadow:*/
  /*    0 2px 3px 0 rgba(0,0,0,.1) inset,*/
  /*    0 2px 7px 0 rgba(0,0,0,.2);*/
  /*}*/

  .el-button {
    cursor: pointer;
    width: 350px;
    height: 44px;
    margin-top: 25px;
    padding: 0;
    background: #ef4300;
    -moz-border-radius: 6px;
    -webkit-border-radius: 6px;
    border-radius: 6px;
    border: 1px solid #ff730e;
    -moz-box-shadow:
      0 15px 30px 0 rgba(255,255,255,.25) inset,
      0 2px 7px 0 rgba(0,0,0,.2);
    -webkit-box-shadow:
      0 15px 30px 0 rgba(255,255,255,.25) inset,
      0 2px 7px 0 rgba(0,0,0,.2);
    box-shadow:
      0 15px 30px 0 rgba(255,255,255,.25) inset,
      0 2px 7px 0 rgba(0,0,0,.2);
    font-family: 'PT Sans', Helvetica, Arial, sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    text-shadow: 0 1px 2px rgba(0,0,0,.1);
    -o-transition: all .2s;
    -moz-transition: all .2s;
    -webkit-transition: all .2s;
    -ms-transition: all .2s;
    &:hover {
      -moz-box-shadow:
        0 15px 30px 0 rgba(255,255,255,.15) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
      -webkit-box-shadow:
        0 15px 30px 0 rgba(255,255,255,.15) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
      box-shadow:
        0 15px 30px 0 rgba(255,255,255,.15) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
    }
    &:active {
      -moz-box-shadow:
        0 15px 30px 0 rgba(255,255,255,.15) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
      -webkit-box-shadow:
        0 15px 30px 0 rgba(255,255,255,.15) inset,
        0 2px 7px 0 rgba(0,0,0,.2);
      box-shadow:
        0 5px 8px 0 rgba(0,0,0,.1) inset,
        0 1px 4px 0 rgba(0,0,0,.1);

      border: 0px solid #ef4300;
    }
  }

</style>
