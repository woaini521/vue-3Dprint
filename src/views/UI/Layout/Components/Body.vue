<template>
  <div class="body">

    <div class="carousel" id="carousel">
      <video muted="muted" height="600" width="100%" loop autoplay>
        <source src="http://localhost:8081/video/first5s.mp4" type="video/mp4">
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
            市场调研、产品定位、品牌核心价值提炼、品牌个性与品牌形象塑造、营销传播方案等策略内容。品牌形象、视觉识别系统（VI）设计、产品包装、销售道具、广告宣传品等设计内容。品牌／产品命名、Slogan、品牌故事、广告主题、创意脚本、活动标题、推文、软文等文案内容。
          </div>
        </div>
        <div class="part">
          <div class="pic middle"></div>
          <div class="text">
            市场调研、产品定位、品牌核心价值提炼、品牌个性与品牌形象塑造、营销传播方案等策略内容。品牌形象、视觉识别系统（VI）设计、产品包装、销售道具、广告宣传品等设计内容。品牌／产品命名、Slogan、品牌故事、广告主题、创意脚本、活动标题、推文、软文等文案内容。
          </div>
        </div>
        <div class="part">
          <div class="pic right"></div>
          <div class="text">
            市场调研、产品定位、品牌核心价值提炼、品牌个性与品牌形象塑造、营销传播方案等策略内容。品牌形象、视觉识别系统（VI）设计、产品包装、销售道具、广告宣传品等设计内容。品牌／产品命名、Slogan、品牌故事、广告主题、创意脚本、活动标题、推文、软文等文案内容。
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
      <el-button type="primary" round size="medium" >更多模型</el-button>
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
            };
        },
        methods:{

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
            margin-top: 40px;
            font-size: 16px;
            font-style: normal;
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
