<template>
<!--  050827-->
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
    <template v-if="this.$store.state.user.userToken || this.$store.state.admin.adminToken">
      <el-menu-item index="">
        <i class="el-icon-upload"></i>
        <span slot="title">我的上传</span>
      </el-menu-item>
    </template>
    <el-menu-item index="">
      <i class="el-icon-upload"></i>
      <span slot="title">全部模型</span>
    </el-menu-item>
  </el-menu>
  <!--    <el-button icon="el-icon-menu" @click="changeCollapse"></el-button>-->
</template>

<script>
    export default {
        name: "NavMenu",
        data() {
            return {
                isCollapse: false
            };
        },
        methods: {
            changeCollapse() {
                this.isCollapse !== true ? this.isCollapse = true : this.isCollapse = false
            }
        }
    }
</script>

<style lang="scss" scoped>

  .el-menu-vertical-demo {
    /*height: 100%;*/
    min-height: 300px;
    width: 200px;
    text-align: left;
    box-shadow: #b8bacc 0 2px 4px;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    /*height: 100%;*/
    width: 200px;
    text-align: left;
  }
</style>

