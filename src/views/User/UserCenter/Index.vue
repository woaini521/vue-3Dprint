<template>
  <div class="main">
    <Head></Head>
    <div class="body">
      <div>
        <NavMenu></NavMenu>
      </div>
      <div class="view">

        <keep-alive>
          <router-view></router-view>
        </keep-alive>

      </div>
    </div>
  </div>
</template>

<script>
    import Head from "../Layout/Components/Head";
    import NavMenu from "../../User/UserCenter/Components/NavMenu";
    export default {
        name: "UserCenter",
        components: {NavMenu,  Head}
    }
</script>

<style lang="scss" scoped>
  .main{
    width: 100%;
    height: 100%;
    /*background: #f5f5f5;*/
    background-position: center center;
    background-size: cover;
    background-image: linear-gradient(to bottom,#ffffff,#050827);
    .body{
      margin-top: 100px;
      display: flex;
      width: 70%;
      margin-left: 15%;
      /*box-shadow: #dedede 1px 1px 2px;*/
      .view{
        background: #fff;
        margin: 0 auto;
        width: 100%;
        height: 100%;
        /*box-shadow: #dedede 1px 1px 2px;*/
      }
    }
  }
</style>
