<template>
  <el-row>
    <el-col>
      <div class="grid-content bg-purple-dark">
        <div class="topbar">
<!--          <img src="../../../../../static/favicon.ico" class="topbar_logo">-->
          <div class="topbar_title">3D PRINT</div>
          <div class="dropdowm">
            <el-dropdown @command="">
                  <span class="el-dropdown-link">
<!--                    {{this.$store.state.admin.adminName}}-->
                    管理员
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="logout" @click.native="adminLogout">注销</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
    export default {
        name: "Head",
        methods: {
            //管理员注销
            adminLogout(){
                this.$messageBox.confirm("是否注销？","确认",{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$store.commit("clearName");
                    this.$store.commit("clearNickName");
                    this.$store.commit("clearIdentity");
                    this.$store.commit("clearToken");

                    this.$store.commit("clearTab");
                    this.$message.success("注销成功");
                    this.$router.replace('/index');
                }).catch(() => {

                })
            },
        }
    }
</script>

<style scoped>

  .grid-content {
    /*min-height: 120px;*/
    display: flex;
    flex-direction: column;
  }
  .bg-purple-dark {
/*    background-image: linear-gradient(to right,#f5f5f5,#dedede,#050827);*/
    background: #fff;
  }
  .grid-content .topbar{
    display: flex;
    align-items: center;
    width: 100%;
    height: 60px;
  }
  .topbar .topbar_logo{
    margin-left: 20px;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    overflow: hidden;
  }
  .topbar .topbar_title{
    margin-left: 20px;
    align-items: center;
    color: #111;
    font-weight: bold;
  }
  .topbar .dropdowm{
    display: flex;
    align-items: center;
    margin-right: 20px;
    margin-left: auto;
  }
  .el-dropdown-link {
    cursor: pointer;
    font-weight: bold;
    color: #000;
  }
  .el-icon-arrow-down {
    font-size: 14px;
    font-weight: bold;
  }
</style>
