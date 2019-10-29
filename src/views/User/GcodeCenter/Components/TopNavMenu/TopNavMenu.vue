<template>
  <div class="TopNavMenu">
    <div class="main">
      <div v-for="item in items" :key="item">
        <div class="TopNavMenu_main_text">{{item}}</div>
      </div>
    </div>
    <div class="TopNavMenu_search">
      <div>
        <el-input
          size="medium"
          placeholder="搜索模型"
          prefix-icon="el-icon-search"
          >
        </el-input>
      </div>

      <div class="TopNavMenu_search_button">
<!--        <el-button type="info" icon="el-icon-search" circle  style="background: #292421;border-color: #292421;"></el-button>-->
        <el-button type="info" icon="el-icon-search" circle style="height: 100%; width: 100%"></el-button>
      </div>
    </div>
<!--  <el-menu :default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">-->
<!--    <el-menu-item index="1" style="margin-left: 20%">首页</el-menu-item>-->
<!--    <el-menu-item index="2">日用品</el-menu-item>-->
<!--    <el-menu-item index="3">玩具</el-menu-item>-->
<!--    <el-menu-item index="4">艺术品</el-menu-item>-->
<!--    <el-menu-item index="5">动漫周边</el-menu-item>-->
<!--  </el-menu>-->
  </div>
</template>

<script>
    export default {
        name: "TopNavMenu",
        data(){
            return{
                items: ['日用品','玩具','艺术品','动漫周边']
            };
        }
    }
</script>

<style lang="scss" scoped>
  .TopNavMenu{
    width: 100%;
    display: flex;
    position: fixed;
    height: 60px;
    background: #fff;
    .main{
      margin-left: 20%;
      margin-right: auto;
      display: flex;
      align-items: center;
      text-align: center;
      .TopNavMenu_main_text{
        padding: 0 20px;
        width: 60px;
        font-size: 15px;
        font-weight: bold;
        color: #111;
        cursor: pointer;
        &:hover{
          /*color: white;*/
          cursor: pointer;
        }
      }

    }
    .TopNavMenu_search{
      height: 100%;
      margin-right: 20%;
      margin-left: auto;
      display: flex;
      align-items: center;
      .TopNavMenu_search_button{
        margin-left: 10px;
      }
    }
  }

</style>
