<template>
  <div class="main">
    <div class="body">
      <el-divider content-position="left"><span style="color: #f4516c; font-weight: bold">详情</span></el-divider>
      <div class="line">
        <div class="label">头像&emsp;&emsp;</div>
        <el-image :src="userInfo.avatar"></el-image>
      </div>
      <div class="line">
        <div class="label">账号&emsp;&emsp;</div>
        <div class="value">{{this.$store.state.user.userName}}</div>
      </div>
      <div class="line">
        <div class="label">昵称&emsp;&emsp;</div>
        <div class="value">
          <el-input autocomplete="off" placeholder="请输入昵称" v-model="userInfo.nickname" size="small" maxlength="8" show-word-limit></el-input>
        </div>
      </div>
      <div class="line">
        <div class="label">注册时间</div>
        <div class="value">{{userInfo.time}}</div>
      </div>
      <div class="line">
        <div class="label">可用容量</div>
        <div class="value">{{userInfo.size}}/50M</div>
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
        name: "UserInfo",
        data(){
            return{
                userInfo: {
                    avatar: require('@/static/background/Home/p1.jpg'),
                    nickname: '小绿绿',
                    time: '2010-10-10',
                    size: '20M'
                },
            };
        }
    }
</script>

<style lang="scss" scoped>
  .main{
    width: 100%;
    height: 100%;
    background: #fff;

    .body{
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-bottom: 40px;
      .line{
        width: 320px;
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
  .el-image{
    margin-left: 50px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
  }
</style>
