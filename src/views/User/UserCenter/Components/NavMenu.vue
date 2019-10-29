<template>
  <el-menu
    router="true"
    :default-active="this.$route.path"
    :collapse="isCollapse"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#050827"
    text-color="#fff"
    active-text-color="#409EFF">
    <el-submenu index="1" >
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>用户信息</span>
      </template>
      <el-menu-item-group >
        <el-menu-item index="/userCenter/userInfo">详情</el-menu-item>
        <el-menu-item index="/userCenter/updatePwd">修改密码</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="">
      <i class="el-icon-upload"></i>
      <span slot="title">我的上传</span>
    </el-menu-item>
    <el-menu-item index="">
      <i class="el-icon-download"></i>
      <span slot="title">我的下载</span>
    </el-menu-item>

  </el-menu>
</template>

<script>
    export default {
        name: "NavMenu"
    }
</script>

<style scoped>
  .el-menu-vertical-demo{
    height: 100%;
    width: 200px;
    text-align: left;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    height: 100%;
    width: 200px;
    text-align: left;
  }
</style>
