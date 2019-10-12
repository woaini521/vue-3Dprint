<template>
  <div class="leftmenu">
  <el-row>
    <el-col>
      <el-menu
        router="true"
        :default-active="this.$route.path"
        :collapse="isCollapse"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#475669"
        text-color="#fff"
        active-text-color="#409EFF">
        <el-menu-item index="/admin/index">
          <i class="el-icon-s-home"></i>
          <span slot="title">后台首页</span>
        </el-menu-item>
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">网站首页</span>
        </el-menu-item>
        <el-submenu index="1" >
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>模型Gcode管理</span>
          </template>
          <el-menu-item-group >
            <el-menu-item index="/admin/gcodeType">添加类型</el-menu-item>
            <el-menu-item index="/admin/gcodeManage">产品管理</el-menu-item>
            <el-menu-item index="/admin/gcodeUpload">上传文件</el-menu-item>
            <el-menu-item index="/admin/gcodesUpload">批量上传</el-menu-item>
            <el-menu-item index="/admin/gcodePic">修改默认封面</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-user-solid"></i>
            <span slot="title">用户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/admin/userInfo">用户信息</el-menu-item>
            <el-menu-item index="2-2">修改用户空间</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">系统管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1">修改密码</el-menu-item>
            <el-menu-item index="3-2">修改资料</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="4">
          <i class="el-icon-upload"></i>
          <span slot="title">上传apk</span>
        </el-menu-item>


      </el-menu>
    </el-col>
</el-row>
  </div>
</template>

<script>
    export default {
        name: "NavMenu",
        data(){
            return {
                defaultActive: "/admin/index",
                isCollapse: false
            };
        },
        computed: {
            activeIndex:{
                get(){
                    return this.$store.state.activeIndex;
                },
                set (val) {
                    this.$store.commit('setActiveTab', val);
                }
            },
            openTab(){
                return this.$store.state.openTab;
            }
        },
        mounted () {
            // 刷新时以当前路由做为tab加入tabs
            // 当前路由不是首页时，添加首页以及另一页到store里，并设置激活状态
            // 当前路由是首页时，添加首页到store，并设置激活状态
            this.$store.commit("clearTab");
            if (this.$route.path !== '/admin/index') {
                this.$store.commit('addTab', {route: '/admin/index' , name: '后台首页'});
                this.$store.commit('addTab', {route: this.$route.path , name: this.$route.name });
                this.$store.commit('setActiveTab', this.$route.path);
            } else {
                this.$store.commit('addTab', {route: '/admin/index', name: '后台首页'});
                this.$store.commit('setActiveTab', '/admin/index');

                //this.$router.push('/admin/index');
           }
        },
        watch:{
            '$route'(to,from){

                //判断路由是否已经打开
                //已经打开的 ，将其置为active
                //未打开的，将其放入队列里
                let flag = false;
                for(let item of this.openTab){
                    if(item.name === to.name){
                        this.$store.commit('setActiveTab',to.path);
                        flag = true;
                        break;
                    }
                }
                if(!flag){
                    this.$store.commit('addTab', {route: to.path, name: to.name});
                    this.$store.commit('setActiveTab', to.path);
                }
            }
        },
        methods:{
        }
    }

</script>

<style scoped>
  .leftmenu {
    /*height: 100%;*/
    width: 300px;
    background: #475669;
    /*background: #292421;*/
    min-height: 400px;
    text-align: left;
 }
  .el-menu-vertical-demo{
    height: 100%;
    width: 300px;
    min-height: 400px;
    text-align: left;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    height: 100%;
    width: 300px;
    min-height: 400px;
    text-align: left;
  }
</style>
