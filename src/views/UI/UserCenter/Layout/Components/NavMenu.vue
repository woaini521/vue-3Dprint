<template>
  <el-menu
    router="true"
    :default-active="this.$route.path"
    :collapse="isCollapse"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#292421"
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
    <el-menu-item index="/userCenter/gcodeUpload">
      <i class="el-icon-upload"></i>
      <span slot="title">上传模型</span>
    </el-menu-item>
    <el-menu-item index="/userCenter/gcodeManage">
      <i class="el-icon-download"></i>
      <span slot="title">模型管理</span>
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
    width: 200px;
    text-align: left;
    box-shadow: #b8bacc 0 2px 4px;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    text-align: left;
  }
</style>
