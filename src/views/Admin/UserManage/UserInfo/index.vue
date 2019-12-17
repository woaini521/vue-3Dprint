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
        @select="handleSelectionChange"
        @select-all="handleSelectionChange">
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
              <el-button size="mini" type="default" @click="handleReset(scope.$index, scope.row.userId)">重置密码</el-button>
              <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row.userId)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row.userId)">删除</el-button>
            </template>
          </el-table-column>
        </template>
      </el-table>

      <div class="pagination">
        <Pagination
          :total="totalSize"
          @pageChange="pageChange"></Pagination>
      </div>
      <EditPage
        v-if="showEditPage"
        :b-show.sync="showEditPage"
        :user-id="userId"
        @refresh="refresh"
      ></EditPage>
    </div>
  </div>
</template>

<script>
    import Pagination from '@/components/Pagination';
    import SearchView from '@/components/SearchView';
    import columModel from './model/columModel';
    import EditPage from './edit';

    export default {
        name: "UserInfo",
        components: {Pagination,SearchView,EditPage},
        data(){
            return {
                //表格列
                colums: columModel.new(),

                //多项选择
                multipleSelection: [],

                tableData: [],
                // loading: true,
                totalSize: 0,//总条数
                pageQuery: {
                    page:{
                        current: 1, //当前页
                        size: 10//每页显示的条目数
                    },
                    //查询条件
                    query:{},
                },
                showEditPage: false,
                userId: ''
            };
        },
       mounted(){
            this.getAllUser();
        },
        methods:{
            search(model){
                this.pageQuery.query = model;
                this.getAllUser();
            },
            getAllUser(){
                let that = this;
                let loading = that.$loading.service({
                    text: '正在加载',
                    lock: true,
                    target: document.querySelector('.el-table')
                });
                this.$axios.post(that.$api.userInfo.getList,
                    that.pageQuery
                ).then(res => {
                    loading.close();
                    if (res) {
                        that.totalSize = res.data.data.total;
                        that.tableData = res.data.data.records;
                    }
                }).catch(res => {
                    loading.close();
                })
            },
            //重置密码
            handleReset(index,userId){
              let that = this;
              that.$messageBox.confirm("是否重置密码？重置后密码为:123456","确认",{
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
                  that.$axios.put(that.$api.userInfo.resetPassword, {
                      userId: userId
                  }).then(res => {
                      if(res){
                          that.$message.success("重置密码成功");
                      }
                      that.getAllUser();
                  }).catch(res => {
                  })
              }).catch(() => {
              })
            },
            //编辑
            handleEdit(index,userId){
                this.userId = userId;
                this.showEditPage = true;
            },
            //删除
            handleDelete(index,userId){
                let that = this;
                that.$messageBox.confirm("是否删除该用户？删除后无法恢复","确认",{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.$axios.delete(that.$api.userInfo.delete, {
                        params:{
                            userId: userId
                        }
                    }).then(res => {
                        if(res){
                            that.$message.success("删除成功");
                        }
                        that.getAllUser();
                    }).catch(res => {
                    })
                }).catch(() => {
                })
            },
            //批量删除用户
            doMulDelete(){
                let that = this;
                if (this.multipleSelection.length === 0) {
                    this.$message.error("请选择一个或多个删除");
                    return;
                }
                that.$messageBox.confirm("是否批量删除？","确认",{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const array= [];
                    that.multipleSelection.forEach((e) => {
                        array.push(e.userId)
                    });
                    const userIds = array.join(',');
                    that.$axios.delete(that.$api.userInfo.deleteMul,{
                        params:{
                            userIds: userIds
                        }
                    }).then(res => {
                        if(res){
                            that.$message.success("批量删除成功");
                        }
                        that.getAllUser()
                    }).catch(res => {
                    })
                }).catch(() => {

                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //切换页面
            pageChange(page){
                this.pageQuery.page.current= page.currentPage;
                this.pageQuery.page.size = page.pageSize;
                this.getAllUser();
            },
            refresh(){
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
