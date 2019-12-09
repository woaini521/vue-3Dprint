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
                <img :src="url + item.homePic" class="image">
                <div class="txt">
                  {{item.gcodeName}}
                  <div style="color: #b8bacc;font-size: 12px;">&emsp;{{item.statusId}}</div>
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
    import NavMenu from "../GcodeCenter/Components/NavMenu";
    import Pagination from '@/components/Pagination';

    export default {
        name: "GcodeCenter",
        components: {NavMenu, Head, TopNavMenu, Pagination},
        data(){
            return{
                url: 'http://122.51.75.23:8081',
                model:[],
                page:{
                    totalSize: 0,//总条数
                    pageSize: 10,//每页显示的条目数
                    currentPage: 1 //当前页
                }
            };
        },
        mounted(){
            this.getList();
        },
        methods:{
            pageChange(page){
                this.page.currentPage = page.currentPage;
                this.page.pageSize = page.pageSize;
                console.log(this.page.currentPage)
            },
            getList(){
                let that = this;

                let loading = that.$loading.service({
                    text: '正在加载',
                    lock: true,
                    target: document.querySelector('.view')
                });

                that.$axios.get(that.$api.gcodeInfo.getAllGcode, {
                    params: {
                        currentPage: this.page.currentPage,
                        pageSize: this.page.pageSize,
                        query: {}
                    }
                }).then(res => {
                    console.log(res);
                    setTimeout(function () {
                        loading.close();
                        if (res.code === 200) {
                            that.page.totalSize = res.data[1][0];
                            that.model = res.data[0];
                        }
                    },500)

                }).catch(res => {
                    loading.close();
                    console.log(res);
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
  .main{
    width: 100%;
    height: 100%;
    background: #f2f2f2;
    overflow-y: scroll;
    .body{
      margin-top: 150px;
      margin-bottom: 50px;
      display: flex;
      width: 70%;
      margin-left: 15%;
      .view{
        background: #fff;
        margin-left: 20px;
        padding: 15px 10px;
        width: 100%;
        box-shadow: #b8bacc 0 2px 4px;
        border-radius: 8px;
        .group{
          width: 100%;
          min-height: 400px;
          padding: 0 8px;
          .txt{
            padding: 5px 14px;
            display: flex;
            align-items: center;
            font-size: 16px;
          }
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
