<template>
  <div>
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
          height="675px"
          header-row-style="height:75px"
          row-style="height: 60px"
          style="width: 100%"
          fit
          highlight-current-row
          stripe
          @select="handleSelectionChange">
          <el-table-column type="selection" width="50" align="center"/>
<!--          <el-table-column type="index" width="50" align="center" label="序号"/>-->
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
              width="auto"
              align="center"

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
                loading: true,

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
                console.log(this.query)
                // this.getAllType();
            },
            getAllUser(){
                let that = this;
                let loading = that.$loading.service({
                    text: '正在加载',
                    spinner: "el-icon-loading",
                    lock: true,
                    target: document.querySelector('.table')
                });
                this.$axios.get(that.$api.userManage.getList, {
                    params: {
                        currentPage: this.page.currentPage,
                        pageSize: this.page.pageSize
                    }
                })
                    .then(res => {
                        console.log(res);
                        loading.close();
                        if (res.code === 200) {
                            this.page.totalSize = res.data[1][0];
                            this.tableData = res.data[0];
                        }
                    })
                    .catch(res => {
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
                console.log(this.page.currentPage)
                this.getAllUser();
            }
        }
    }
</script>

<style lang="scss" scoped>
  .body {
    width: 100%;
    .search{
      display: flex;
      .btn {
        margin: auto 0 auto auto;
      }
    }
    .table {
      margin-top: 10px;
      padding-bottom: 20px;
      background: #fff;

      .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
      }
    }
  }
</style>
