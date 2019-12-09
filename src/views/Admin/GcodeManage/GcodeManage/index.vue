<template>
  <div>
    <div class="body">
      <div class="search">
        <SearchView :colums="colums" @query="search"></SearchView>
        <div class="btn">
          <el-button type="danger" icon="el-icon-delete" @click="doMulDelete">批量删除</el-button>
        </div>
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          max-height="675px"
          fit
          highlight-current-row
          @select="handleSelectionChange"
          @select-all="handleSelectionChange">
          <el-table-column type="selection" width="50" align="center"/>
<!--          <el-table-column type="index" width="50" align="center" label="序号"/>-->
          <template v-for="(item, key) in colums">
            <el-table-column
              v-if="item.visible && key !== 'operate'"
              :key="key"
              :label="item.label"
              :width="item.width"
              align="center"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-col v-if="key === 'homePic'">
                  <el-image :src="url + scope.row[key]" :preview-src-list="[url + scope.row[key]]" style="width: 50%;"></el-image>
                </el-col>
                <el-col v-else>{{ scope.row[key] }}</el-col>
              </template>
            </el-table-column>
            <el-table-column
              v-else-if="key === 'operate'"
              :key="key"
              :label="item.label"
              fixed="right"
              :width="item.width"
              align="center"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button size="mini" type="default" @click="handleDownload(scope.$index, scope.row.gcodeId)">下载</el-button>
                <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row.gcodeId)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row.gcodeId)">删除</el-button>
<!--                <el-button size="mini" type="info" @click="handleDelete(scope.$index, scope.row.typeId)">查看评论</el-button>-->
              </template>
            </el-table-column>
          </template>
        </el-table>

        <div class="pagination">
          <Pagination
            :total="page.totalSize"
            @pageChange="pageChange"></Pagination>
        </div>
        <EditPage
          v-if="showEditPage"
          :b-show.sync="showEditPage"
          :gcode-id="gcodeId"
          ></EditPage>

      </div>
    </div>
  </div>
</template>

<script>
    import Pagination from '@/components/Pagination';
    import SearchView from '@/components/SearchView';
    import columModel from './model/columModel';
    import EditPage from './edit';

    export default {
        name: "GcodeManage",
        components: {Pagination, SearchView, EditPage},
        data(){
            return{
                loading: false,
                //表格列
                colums: columModel.new(),
                //查询条件
                query: {},
                //表格选择
                multipleSelection: [],
                tableData: [],
                //访问路径
                url: this.$store.state.imgUrl,

                page:{
                    totalSize: 0,//总条数
                    pageSize: 10,//每页显示的条目数
                    currentPage: 1 //当前页
                },
                gcodeId: '',
                showEditPage: false,
            };
        },
        mounted(){
          this.getAllGcode();
        },
        methods:{
            //点击搜索
            search(model) {
                this.query = model;
                this.getAllGcode();
            },
            pageChange(page){
                this.page.currentPage = page.currentPage;
                this.page.pageSize = page.pageSize;
            },
            /**
             * 获取模型信息
             */
            getAllGcode(){
                let that = this;

                let loading = that.$loading.service({
                    text: '正在加载',
                    // spinner: "el-icon-loading",
                    lock: true,
                    target: document.querySelector('.el-table')
                });

                that.$axios.get(that.$api.gcodeInfo.getAllGcode, {
                    params: {
                        currentPage: this.page.currentPage,
                        pageSize: this.page.pageSize,
                        query: this.query
                    }
                }).then(res => {
                    console.log(res);
                    setTimeout(function () {
                        loading.close();
                        if (res.code === 200) {
                            that.page.totalSize = res.data[1][0];
                            that.tableData = res.data[0];
                        }
                    },500)

                }).catch(res => {
                    loading.close();
                    console.log(res);
                })
            },
            handleEdit(index,gcodeId){
                this.gcodeId = gcodeId;
                this.showEditPage = true;
            },
        }
    }
</script>

<style lang="scss" scoped>
  .body {
    width: 95%;
    margin: 0 auto;
    .search {
      display: flex;
      .btn {
        margin: auto 0 auto auto;
      }
    }
    .table {
      width: 100%;
      margin: 10px 0;
      padding-bottom: 20px;
      background: #fff;
      border-radius: 8px;
      box-shadow: #b8bacc 0px 2px 4px;

      .el-table {
        overflow-x: scroll;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }
      .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
      }
    }
  }
</style>
