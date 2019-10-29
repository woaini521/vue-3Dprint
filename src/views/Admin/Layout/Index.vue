<template>
  <div class="page">
    <div class="body">
      <div>
        <NavMenu></NavMenu>
      </div>
      <div class="main">
        <div class="main_head">
          <Head></Head>
        </div>
        <div class="main_body">
          <Main></Main>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import Head from "./Components/Head";
    import NavMenu from "./Components/NavMenu";
    import Main from "./Components/Main";
    export default {
        name: "AdminIndex",
        components: {Main, NavMenu, Head}
    }
</script>

<style lang="scss" scoped>
  .page {
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    display: flex;
    /*flex-direction: column;*/
    .body{
      width: 100%;
      display: flex;
      .main{
        width: 100%;
        height: 100%;
        background: rgba(211, 220, 230, 0.51);
        /*display: flex;*/
        /*flex-direction: column;*/
        .main_head{
          width: 100%;
          height: 60px;
        }
        .main_body{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  /*#app,*/
  /*.page,*/
  /*html,*/
  /*body,*/
  /*.el-container{*/
  /*  padding: 0px;*/
  /*  margin: 0px;*/
  /*  height: 100%;*/
  /*  width: 100%;*/
  /*}*/
  /*.el-header{*/
  /*  width: 100%;*/
  /*  padding: 0px;*/
  /*  margin: 0px;*/
  /*  background-color: #B3C0D1;*/
  /*  color: #333;*/
  /*  text-align: center;*/
  /*  line-height: 60px;*/
  /*}*/
  /*.el-aside {*/
  /*  height: 100%;*/
  /*  width: 300px;*/
  /*  text-align: center;*/
  /*  line-height: 200px;*/
  /*  margin: 0;*/
  /*  padding: 0;*/
  /*}*/
  /*.el-main {*/
  /*  padding: 0px;*/
  /*  margin: 0px;*/
  /*  background-color: #343434;*/
  /*  color: #333;*/
  /*  text-align: center;*/
  /*  line-height: 160px;*/
  /*  width: 100%;*/
</style>


