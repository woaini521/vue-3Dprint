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
    import Head from "../../Layout/Components/Head";
    import NavMenu from "./Components/NavMenu";
    export default {
        name: "UserCenter",
        components: {NavMenu,  Head}
    }
</script>

<style lang="scss" scoped>
  .main{
    width: 100%;
    height: 100%;
    background: #f2f2f2;
    overflow-y: scroll;
    .body{
      margin-top: 100px;
      margin-bottom: 80px;
      display: flex;
      width: 75%;
      margin-left: 15%;
      .view{
        background: #fff;
        margin-left: 20px;
        width: 100%;
        box-shadow: #b8bacc 0 2px 4px;
        border-radius: 8px;
      }
    }
  }
</style>
