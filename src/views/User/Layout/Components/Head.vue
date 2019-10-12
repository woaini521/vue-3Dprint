<template>
  <div>
    <el-row>
      <el-col>
        <div class="grid-content bg-purple-dark">
          <div class="topbar">
            <div class="topbar_title">欢迎访问本站</div>
            <div class="text">
              <template v-if="this.$store.state.user.userToken">

                <el-dropdown @command="">
                  <span class="el-dropdown-link">
                    {{this.$store.state.user.userName}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="usercenter" @click.native="">个人中心</el-dropdown-item>
                    <el-dropdown-item command="logout" @click.native="userLogout">注销</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>

              </template>
              <template v-else-if="this.$store.state.admin.adminToken">

                <el-dropdown @command="">
                  <span class="el-dropdown-link">
                    {{this.$store.state.admin.adminName}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="usercenter" @click.native="toAdminIndex">后台管理</el-dropdown-item>
                    <el-dropdown-item command="logout" @click.native="adminLogout">注销</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>

              </template>
              <template v-else>
                <div class="login">
                  <el-dropdown @command="handleCommand">
                  <span class="el-dropdown-link">
                    登录<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="user" @click.native="LoginDialogFormVisible = true">普通用户</el-dropdown-item>
                      <el-dropdown-item command="admin" @click.native="toAdminLogin">管理员</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
                <div class="register" @click="RegisterdialogFormVisible = true">注册</div>
              </template>

            </div>
          </div>
        </div>
      </el-col>
    </el-row>

<!--登录弹窗-->
    <el-dialog title="登录" :visible.sync="LoginDialogFormVisible" center :append-to-body="true" width="500px" :show-close="false">
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm" status-icon label-width="auto" label-position="left" size="medium" style="width: 100%; display: flex; flex-direction: column;align-items: center">
        <div style="text-align: left">
            <el-form-item label="账号" prop="username">
              <el-input v-model="loginForm.username" autocomplete="off" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="loginForm.password" autocomplete="off" placeholder="请输入密码" show-password></el-input>
            </el-form-item>
        </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetLoginForm('loginForm')">取 消</el-button>
          <el-button type="primary" @click="login('loginForm')">确 定</el-button>
        </div>
    </el-dialog>

<!--    注册弹窗-->
    <el-dialog title="注册" :visible.sync="RegisterdialogFormVisible" center :append-to-body="true" width="500px" :show-close="false">
        <el-form :model="registerForm" :rules="registerRules" ref="registerForm" status-icon label-width="auto" label-position="left" size="medium" style="width: 100%; display: flex; flex-direction: column; align-items: center">
          <div style="text-align: left">
            <el-form-item label="账号" prop="username">
              <el-input v-model="registerForm.username" autocomplete="off" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
              <el-input v-model="registerForm.nickname" autocomplete="off" placeholder="请输入昵称"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
              <el-input v-model="registerForm.pwd" autocomplete="off" placeholder="请输入密码" show-password></el-input>
            </el-form-item>
            <el-form-item label="再次输入密码" prop="pwd_confirm">
              <el-input v-model="registerForm.pwd_confirm" autocomplete="off" placeholder="请再次输入密码" show-password></el-input>
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetRegisterForm('registerForm')">取 消</el-button>
          <el-button type="primary" @click="register('registerForm')">确 定</el-button>
        </div>
    </el-dialog>

  </div>
</template>



<script>
    export default {
        name: "Head",
        data(){
            var checkPassword = (rule,value,callback) => {
                if(value === ''){
                    return callback(new Error('确认密码不能为空'));
                }
                if(value !== this.registerForm.pwd){
                    return callback(new Error('两次输入密码不一致!'));
                } else{
                    callback();
                }
            };
            return{
                //登录表单
                loginForm: {
                    username: '',
                    password: ''
                },
                // 注册表单
                registerForm: {
                    username: '',
                    nickname: '',
                    pwd: '',
                    pwd_confirm: '',
                },
                //注册框显示
                RegisterdialogFormVisible: false,
                //登录框显示
                LoginDialogFormVisible: false,
                //表单校验规则
                loginRules:{
                    username:[
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
                    ],
                    password:[
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ]
                },
                registerRules:{
                    username:[
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
                    ],
                    nickname:[
                        { required: true, message: '昵称不能为空', trigger: 'blur' }
                    ],
                    pwd:[
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ],
                    pwd_confirm:[
                        { required: true,validator: checkPassword,trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            //用户登录
            login(loginForm) {
                let that = this;
                that.$refs[loginForm].validate((valid) =>{
                    if(valid){
                        let loading = that.$loading.service({
                            text: '正在加载',
                            spinner: "el-icon-loading",
                            lock: true,
                            background: "rgba(0, 0, 0, 0.8)",
                            //target: document.querySelector('.dialog')
                        });

                        let password = that.$aes.encrypt(that.loginForm.password);
                        that.$axios.post(that.$api.user.login,{
                            username: that.loginForm.username,
                            password: password
                        }).then(res => {
                            console.log(res);
                            setTimeout(function () {
                                loading.close();
                                if(res.code === 200){
                                    //登录成功，设置cookie
                                    that.$store.commit("saveUserToken",{"userName":that.loginForm.username,"userToken":that.loginForm.username});
                                }
                                //初始化表单
                                that.resetLoginForm(loginForm)
                            },500);
                        }).catch(res =>{
                            loading.close();
                            console.log(res)
                        })
                    }
                });

            },
            //用户注销
            userLogout(){
              this.$messageBox.confirm("是否注销？","确认",{
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
                  this.$store.commit("clearUserToken");
                  this.$message.success("注销成功");
              }).catch(() => {

              })
            },
            //管理员注销
            adminLogout(){
                this.$messageBox.confirm("是否注销？","确认",{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$store.commit("clearAdminToken");
                    this.$message.success("注销成功");
                }).catch(() => {

                })
            },
            //注册
            register(registerForm){
                var that = this;
                that.$refs[registerForm].validate((valid) =>{
                    if(valid){
                        let loading = that.$loading.service({
                            text: '正在加载',
                            spinner: "el-icon-loading",
                            lock: true,
                            background: "rgba(0, 0, 0, 0.8)"
                        });

                        let password = that.$aes.encrypt(that.registerForm.pwd);
                        that.$axios.post(that.$api.user.register,{
                            username: that.registerForm.username,
                            nickname: that.registerForm.nickname,
                            password: password
                        }).then(res => {
                            console.log(res);
                            setTimeout(function () {
                                loading.close();
                                if(res.code === 200){
                                    //初始化表单
                                    that.resetRegisterForm(registerForm)
                                }
                            },500);
                        }).catch(res =>{
                            loading.close();
                            console.log(res)
                        })
                    }
                });
            },
            // 重置表单
            resetLoginForm(formName) {
                this.LoginDialogFormVisible = false;
                this.$refs[formName].resetFields();
            },
            // 重置表单
            resetRegisterForm(formName) {
                this.RegisterdialogFormVisible = false;
                this.$refs[formName].resetFields();
            },
            //跳转至后台首页
            toAdminIndex(){
                this.$router.push('/admin/index')
            },
            //跳转至后台登录页
            toAdminLogin(){
                this.$router.push('/adminLogin')
            }
        }
    }
</script>

<style scoped>
  .grid-content {
    min-height: 60px;
    display: flex;
  }
  .bg-purple-dark {
    background: #475669;
    /*background: #292421;*/
  }
  .grid-content .topbar{
    align-self: center;
    display: flex;
    height: 100%;
    width: 60%;
    margin-left: 20%;
    align-items: center;
  }
  .topbar .topbar_logo{
    margin: 0 20px;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    overflow: hidden;
  }
  .topbar .topbar_title{
    color: #fff;
    font-weight: bold;
  }
  .topbar .text{
    display: flex;
    align-items: center;
    margin-right: 0px;
    margin-left: auto;
  }
  .text .login{
    color: #fff;
    margin-right: 20px;
    font-size: 14px;
  }
  .text .register{
    color: #fff;
    cursor: pointer;
    font-size: 14px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #fff;
  }
  .el-icon-arrow-down {
    font-size: 14px;
  }
</style>
