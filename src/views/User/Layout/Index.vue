<template>
  <div class="page">
<!--    <Head></Head>-->
    <el-container direction="vertical">
      <el-header>
        <Head></Head>
      </el-header>
      <el-main>
        <Body></Body>
        <Foot></Foot>
      </el-main>
    </el-container>
  </div>
</template>

<script>
    import Head from "./Components/Head";
    import Body from "./Components/Body";
    import Foot from "./Components/Foot";
    export default {
        name: "UserIndex",
        components: {Foot, Body, Head}
    }
</script>

<style scoped>
  #app,
  html,
  .page,
  .el-container{
    padding: 0px;
    margin: 0px;
    height: 100%;
    width: 100%;
  }
  .el-header,.el-footer{
    width: 100%;
    padding: 0px;
    margin: 0px;
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-main {
    padding: 0px;
    margin: 0px;
    background-color: #ffffff;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  /*body > .el-container {*/
  /*  margin-bottom: 40px;*/
  /*}*/

</style>
