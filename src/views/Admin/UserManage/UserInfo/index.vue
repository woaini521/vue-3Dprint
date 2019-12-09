<template>
  <div class="body">
    <div class="search">
      <SearchView :colums="colums" @query="search"></SearchView>
      <div class="btn">
        <el-button type="danger" icon="el-icon-delete"  @click="doMulDelete">批量删除</el-button>
      </div>
    </div>

    <div class="table">
      <el-table
        :data="tableData"
        max-height="675px"
        fit
        highlight-current-row
        stripe
        @select="handleSelectionChange">
        <el-table-column type="selection" width="50" align="center"/>
        <el-table-column type="index" width="50" align="center" label="序号"/>
        <template v-for="(item, key) in colums">
          <el-table-column
            v-if="item.visible && key !== 'operate'"
            :key="key"
            :label="item.label"
            width="auto"
            align="center"

            show-overflow-tooltip>
            <template slot-scope="scope">
              <el-col>{{ scope.row[key] }}</el-col>
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="key === 'operate'"
            :key="key"
            :label="item.label"
            width="250"
            align="center"
            fixed="right"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button size="mini" type="default" @click="handleEdit(scope.$index, scope.row)">重置密码</el-button>
              <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </template>
      </el-table>

      <div class="pagination">
        <Pagination
          :total="page.totalSize"
          @pageChange="pageChange"></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
    import Pagination from '@/components/Pagination';
    import SearchView from '@/components/SearchView';
    import columModel from './model/columModel';

    export default {
        name: "UserInfo",
        components: {Pagination,SearchView},
        data(){
            return {
                //表格列
                colums: columModel.new(),
                //查询条件
                query:{},
                //表格选择
                multipleSelection: [],

                tableData: [],
                // loading: true,

                page:{
                    totalSize: 0,//总条数
                    pageSize: 10,//每页显示的条目数
                    currentPage: 1 //当前页
                }
            };
        },
       mounted(){
            this.getAllUser();
        },
        methods:{
            search(model){
                this.query = model;
                this.getAllUser();
            },
            getAllUser(){
                let that = this;
                let loading = that.$loading.service({
                    text: '正在加载',
                    // spinner: "el-icon-loading",
                    lock: true,
                    target: document.querySelector('.el-table')
                });
                this.$axios.get(that.$api.userInfo.getList, {
                    params: {
                        currentPage: this.page.currentPage,
                        pageSize: this.page.pageSize,
                        query: this.query
                    }
                }).then(res => {
                    setTimeout(function () {
                        loading.close();
                        if (res.data.code === 200) {
                            that.page.totalSize = res.data.data[1][0];
                            that.tableData = res.data.data[0];
                        }
                    },500)
                }).catch(res => {
                    loading.close();
                    console.log(res);
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(this.multipleSelection)
            },
            pageChange(page){
                this.page.currentPage = page.currentPage;
                this.page.pageSize = page.pageSize;
                this.getAllUser();
            }
        }
    }
</script>

<style lang="scss" scoped>
  .body {
    width: 95%;
    margin: 0 auto;
    .search{
      display: flex;
      .btn {
        margin: auto 0 auto auto;
      }
    }
    .table {
      margin: 10px 0;
      padding-bottom: 20px;
      background: #fff;
      border-radius: 8px;
      box-shadow: #b8bacc 0px 2px 4px;
      .el-table{
        width: 100%;
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
