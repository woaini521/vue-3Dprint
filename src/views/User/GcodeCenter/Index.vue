<template>
  <div class="main">
    <Head></Head>
    <div style="margin-top: 60px">
      <TopNavMenu></TopNavMenu>
    </div>
    <div class="body">
      <div>
        <NavMenu></NavMenu>
      </div>
      <div class="view">
        <div class="group">
          <el-row :gutter="15" style="width: 100%">
            <el-col :span="6" v-for="item in model" :key="o">
              <el-card :body-style="{ padding: '0px'}" shadow="never">
                <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                <div style="padding: 5px 14px;display: flex;align-items: center">
                  {{item.name}}
                  <div style="color: #b8bacc;font-size: 12px;">&emsp;(公共模型)</div>
                  <el-button type="text" class="button">下载</el-button>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>

        <div class="pagination">
          <Pagination
            :total="page.totalSize"
            @pageChange="pageChange"></Pagination>
        </div>

      </div>
    </div>
  </div>



</template>

<script>
    import TopNavMenu from "./Components/TopNavMenu/TopNavMenu";
    import Head from "../Layout/Components/Head";
    import NavMenu from "../../User/GcodeCenter/Components/NavMenu";
    import Pagination from '@/components/Pagination';

    export default {
        name: "GcodeCenter",
        components: {NavMenu, Head, TopNavMenu, Pagination},
        data(){
            return{
                model:[
                    {
                        url: '',
                        name: 'ada'
                    },
                    {
                        url: '',
                        name: '2',
                    },
                    {
                        url: '',
                        name: '3'
                    },
                    {
                        url: '',
                        name: '1'
                    },
                    {
                        url: '',
                        name: '2',
                    },
                    {
                        url: '',
                        name: '3'
                    }
                ],

                page:{
                    totalSize: 0,//总条数
                    pageSize: 10,//每页显示的条目数
                    currentPage: 1 //当前页
                }
            };
        },
        methods:{
            pageChange(page){
                this.page.currentPage = page.currentPage;
                this.page.pageSize = page.pageSize;
                console.log(this.page.currentPage)

            }
        },
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
      margin-top: 140px;
      display: flex;
      width: 70%;
      margin-left: 15%;
      /*box-shadow: #dedede 1px 1px 2px;*/
      .view{
        background: #fff;
        margin: 0 auto;
        padding: 20px 10px;
        width: 100%;
        height: 100%;
        .group{
          width: 100%;
          padding: 0 8px;
          .el-card{
            margin: 8px 0;
          }
          .image {
            width: 100%;
            height: 180px;
            /*display: block;*/
          }
          .button{
            float: right;
            margin-right: 0;
            margin-left: auto;
          }
        }
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top:20px;
        }
      }
    }
  }
</style>
