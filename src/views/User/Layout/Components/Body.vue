<template>
  <div>
    <TopNavMenu></TopNavMenu>
    <div class="carousel">
      <el-carousel :interval="4000" height="700px">
        <el-carousel-item v-for="item in urls" :key="item">
<!--      <h3 class="medium">{{ item }}</h3>-->
        <el-image :src="item" fit="fill" class="img"></el-image>
      </el-carousel-item>
      </el-carousel>
    </div>

    <div class="tip">
      <el-card class="box-card" shadow="always">
        <!--        <div class="title1">欢迎使用</div>-->
        <div class="title2">欢迎使用  嘉园-普瑞特 3D打印云平台</div>
      </el-card>
    </div>

<!--    <el-divider content-position="center"></el-divider>-->

    <div class="starproducts">
      <div class="text1">精选模型</div>
      <div class="text2">精心为您挑选的模型，希望喜欢</div>

      <el-row :gutter="5">
        <el-col :span="6" v-for="(o, index) in 4" :key="o" >
          <el-card shadow="none" class="card">
            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
            <div class="card-text">
              <span>模型</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div class="more">
      <div class="text1">更多精彩模型在等你哦</div>
      <el-button type="primary" round style="color: #fff">更多模型</el-button>
    </div>
  </div>
</template>

<script>
    import TopNavMenu from "./TopNavMenu/TopNavMenu";
    export default {
        name: "Body",
        components: {TopNavMenu},
        data(){
            return{
                urls: [
                    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
                    'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
                    'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
                    'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
                    'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
                    'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
                    'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
                ]
            };
        }
    }
</script>

<style scoped>
  .tip{
    /*text-align: center;*/
    display: flex;
  }
  .box-card {
    /*width: 40%;*/
    /*margin-left: 30%;*/
    width: 100%;
    margin-top: 0px;
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /*border-radius: 50px;*/
    background: #fff;
    /*color: #ffffff;*/
    box-shadow: grey 0px 0px 15px;
  }
  .box-card:hover{
    background: #fff;
    color: #111;
  }
  .box-card .title1{
    font-size: 18px;
    font-weight: bold;
    font-style: italic;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .box-card .title2{
    font-size: 26px;
    font-weight: bold;
    font-style: normal;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .carousel{
    height: 100%;
    width: 100%;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .img{
    width: 100%;
    height: 100%;
  }
  .starproducts{
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 420px;
  }
  .starproducts .text1{
    height: 50px;
    font-size: 26px;
    font-weight: bold;
    font-style: normal;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .starproducts .text2{
    height: 50px;
    font-size: 14px;
    font-weight: bold;
    font-style: normal;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .card{
    margin: 40px;
    background: #f6f6f6;
  }
  .card:hover{
    background: #fff;
    box-shadow: lightgray 0 0 20px;
  }
  .card .card-text{
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
  .image {
    width: 100%;
    display: block;
  }

  .more{
    height: 350px;
    background: #ececec;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: grey 0px 0px 20px;
  }
  .more .text1{
    height: 50px;
    font-size: 14px;
    font-weight: bold;
    font-style: normal;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .more .el-button{
    color: #111;
    font-weight: bold;
  }
</style>
