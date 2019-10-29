<template>
  <div class="main">
    <div class="body">
      <el-divider content-position="left"><span style="color: #f4516c; font-weight: bold">修改密码</span></el-divider>

      <div class="line">
        <div class="label">原密码&emsp;</div>
        <div class="value">
          <el-input autocomplete="off" placeholder="请输入原密码" v-model="pwd_old" size="small" show-password></el-input>
        </div>
      </div>
      <div class="line">
        <div class="label">新密码&emsp;</div>
        <div class="value">
          <el-input autocomplete="off" placeholder="请输入新密码" v-model="pwd_old" size="small" show-password></el-input>
        </div>
      </div>
      <div class="line">
        <div class="label">确认密码</div>
        <div class="value">
          <el-input autocomplete="off" placeholder="请再次输入新密码" v-model="pwd_old" size="small" show-password></el-input>
        </div>
      </div>
      <div class="line_btn">
        <el-button type="primary">保存</el-button>
        <el-button type="info">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "UpdatePwd",
        data(){
            return{
              pwd_old: '123456'
            };
        }
    }
</script>

<style lang="scss" scoped>
  .main {
    width: 100%;
    height: 100%;
    background: #fff;

    .body {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-bottom: 40px;
      .line{
        width: 350px;
        margin: 10px 100px;
        padding: 5px 20px;
        display: flex;
        align-items: center;
        .label{
          font-size: 15px;
          font-weight: bold;
        }
        .value{
          margin-left: 50px;
          font-size: 16px;
          color: #b8bacc;
        }
      }
      .line_btn{
        margin: 20px 0px;
        padding: 5px 20px;
        text-align: center;
      }
    }

  }
</style>
