<template>
  <div class="body">

    <div class="carousel" id="carousel">
      <video height="600" width="100%" loop autoplay muted>
        <source :src="url" type="video/mp4">
      </video>
      <div class="title">
        <div class="title_text1">3D PRINT</div>
        <div class="title_text2">生产资源平台</div>
      </div>
<!--      <el-carousel :interval="4000" height="800px">-->
<!--        <el-carousel-item v-for="item in urls" :key="item">-->
<!--&lt;!&ndash;      <h3 class="medium">{{ item }}</h3>&ndash;&gt;-->
<!--        <el-image :src="item" fit="fill" class="img"></el-image>-->
<!--      </el-carousel-item>-->
<!--      </el-carousel>-->
    </div>
    <div class="intro">
      <div class="title">平台介绍</div>
      <div class="body">
        <div class="part">
          <div class="pic left"></div>
          <div class="text">
            <h3>小程序</h3>
            用户通过微信小程序或app可以轻松远程控制3D打印机对存储在云端的资源模型进行打印并将打印进度可视化呈现
          </div>
        </div>
        <div class="part">
          <div class="pic middle"></div>
          <div class="text">
            <h3>Web</h3>
            Web网站可以上传用户欲分享的3D打印建模，针对两种角色即管理员和普通注册用户进行设计开发
          </div>
        </div>
        <div class="part">
          <div class="pic right"></div>
          <div class="text">
            <h3>安卓端</h3>
            下位机安卓板作为中间件，起到连接上位机和打印机的作用，除了分发远程指令，安卓板也可直接控制打印机，实现本地打印
          </div>
        </div>
      </div>
    </div>

    <div class="starproducts">
      <div class="text1">精选模型</div>
<!--      <div class="text2">精心为您挑选的模型，希望喜欢</div>-->
      <el-row style="width: 95%;">
        <el-col :span="6" v-for="item in model" :key="o" >
          <el-card shadow="none" class="card" :body-style="{ padding: '0px' }">
            <el-image :src=item.url fit="fill" class="image"></el-image>
            <div class="card-text">
              <span>{{item.label}}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="more">
      <div class="text1">更多精彩模型</div>
      <el-button type="primary" round size="medium" @click="toGcodeCenter">更多模型</el-button>
    </div>
  </div>
</template>

<script>
    import TopNavMenu from "../../GcodeCenter/Components/TopNavMenu/TopNavMenu";
    import Head from "./Head";
    export default {
        name: "Body",
        components: {Head, TopNavMenu},
        mounted(){


        },
        data(){
            return{
                model: [
                    {url: require('@/static/background/Home/timg1.jpg'),label: "日用品"},
                    {url: require('@/static/background/Home/timg2.jpg'),label: "玩具"},
                    {url: require('@/static/background/Home/timg3.jpg'),label: "动漫周边"},
                    {url: require('@/static/background/Home/timg4.jpg'),label: "艺术"}
                ],
                isFix: false,

                url: this.$store.state.httpUrl  + "/video/first5s.mp4"
            };
        },
        methods:{
            toGcodeCenter(){
                this.$router.replace("/gcodeCenter");
            }
        }
    }
</script>

<style lang="scss" scoped>

  .body{
    width: 100%;
    .carousel{
      top: 0;
      left: 0;
      overflow: hidden;
      width: 100%;
      height: 100%;
      position: relative;
      background: #f5f5f5;
      video {
        object-fit: fill;
      }
      .img{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        float: left;
        width: 100%;
        height: 100%;
        background-position: center center;
        background-size: cover;
        overflow: hidden;
        background-image: url('~@/static/background/Home/aboutnr_01.jpg');
      }
      .title{
        position: absolute;
        top: 180px;
        left: 15%;
        overflow: auto;
        text-align: center;
        .title_text1{
          font-size: 100px;
          color: #fff;
          font-weight: bold;
        }
        .title_text2{
          font-size: 50px;
          color: #fff;
          font-weight: bold;
        }
      }
    }
    .intro{
      background: #f2f2f2;
      padding: 100px 0;
      width: 100%;
      display: flex;
      flex-direction: column;;
      text-align: center;
      .title{
        padding-bottom: 10px;
        margin: 0 auto;
        font-weight: bold;
        font-size: 32px;
        border-bottom: darkorange 3px solid;
      }
      .body{
        width: 100%;
        display: flex;
        justify-content: center;
        text-align: center;
        .part{
          width: 300px;
          height: 100%;
          margin: 40px;
          .pic{
            height: 200px;
            width: 100%;
            background-position: center center;
            background-size: cover;
            overflow: hidden;
            border-radius: 10px;
            &.left{
              background-image: url('~@/static/background/Home/p1.jpg');
            }
            &.right{
              background-image: url('~@/static/background/Home/p2.jpg');
            }
            &.middle{
              background-image: url('~@/static/background/Home/p3.jpg');
            }
          }
          .pic:hover{
            transform: scale(1.2,1.2);
            transition: transform .5s;
          }
          .text{
            width: 100%;
            margin-top: 40px;
            font-size: 16px;
            font-style: normal;
            text-align: left;
          }
        }

      }
    }
    .bg{
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      float: left;
      width: 100%;
      height: 500px;
      background-position: center center;
      background-size: cover;
      overflow: hidden;
      background-attachment: fixed;
      background-image: url('~@/static/background/Home/features-bg.jpg');
    }

    .starproducts{
      width: 100%;
      background: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 100px 0;
      .text1{
        font-size: 32px;
        font-weight: bold;
        padding-bottom: 10px;
        margin: 0 auto;
        border-bottom: darkorange 3px solid;
      }
      .text2{
        height: 50px;
        font-size: 14px;
        font-weight: bold;
        font-style: normal;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .card{
        margin: 40px 10px;
        background: #fff;
        height: 500px;
        padding: 0;
        .card-text{
          width: 100%;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 18px;
        }
        &:hover{
          background: #fff;
          box-shadow: grey 0 0 10px;
          cursor: pointer;
        }
        .image {
          height: 450px;
          width: 100%;
        }
      }
    }
    .more{
      width: 100%;
      height: 500px;
      background: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-position: center center;
      background-size: cover;
      background-attachment: fixed;
      background-image: url('~@/static/background/Home/features-bg.jpg');
      .text1{
        height: 50px;
        font-size: 20px;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
      }
      .el-button{
        margin-top: 20px;
        color: #fff;
        font-weight: bold;
      }
    }
  }


</style>
