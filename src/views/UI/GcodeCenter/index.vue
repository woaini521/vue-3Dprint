<template>
  <div class="main">
    <Head></Head>
    <div style="margin-top: 60px">
      <TopNavMenu @changeId="changeId"></TopNavMenu>
    </div>
    <div class="body">
      <div>
        <NavMenu @changeUser="changeUser" @changeStatus="changeStatus"></NavMenu>
      </div>
      <div class="view">

        <div v-if="totalSize !== 0" class="group">
          <el-row :gutter="15" style="width: 100%">
            <el-col :span="6" v-for="item in model" :key="o">
              <el-card :body-style="{ padding: '0px'}" shadow="always">
                <img :src="url + item.homePic" class="image">
                <div class="txt">
                  {{item.gcodeName}}
                  <div style="color: #b8bacc;font-size: 12px;">&emsp;({{item.typeName}})</div>
                  <el-button type="text" class="button" @click="handleDownload(item.gcodePath)">下载</el-button>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <div v-else class="group no_model">
          暂无模型~~
        </div>

        <div class="pagination">
          <Pagination
            :total="totalSize"
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
                url: this.$store.state.httpUrl,
                model:[],
                totalSize: 0,//总条数
                pageQuery: {
                    page:{
                        size: 10,//每页显示的条目数
                        current: 1 //当前页
                    },
                    query:{}
                }

            };
        },
        mounted(){
            //this.getList();
        },
        methods:{
            pageChange(page){
                this.pageQuery.current= page.currentPage;
                this.pageQuery.size = page.pageSize;
            },
            getList(){
                let that = this;

                let loading = that.$loading.service({
                    text: '正在加载',
                    lock: true,
                    target: document.querySelector('.view')
                });

                that.$axios.post(that.$api.gcodeInfo.getAllGcode,
                    that.pageQuery
                ).then(res => {
                    setTimeout(function () {
                        loading.close();
                        if (res) {
                            that.totalSize = res.data.data.total;
                            that.model = res.data.data.records;
                        }
                    },500)

                }).catch(res => {
                    loading.close();
                })
            },
            handleDownload(path){
                window.open(this.url + path, "_parent");
            },
            changeId(val){
                this.pageQuery.query["typeId"] = val;
                this.getList();
            },
            changeUser(val){
                this.pageQuery.query["userName"] = val;
                this.getList();
            },
            changeStatus(){
                this.pageQuery.query["statusId"] = 0;
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
        .no_model{
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          color: #bcbec2;
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
