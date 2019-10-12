<template>
  <div>
<!--    <el-divider content-position="left"><span style="font-weight: bold;">用户管理</span></el-divider>-->
    <div class="body">
      <div class="table">
        <el-table :data="tableData.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()))"
                   height="675px" header-row-style="height:75px" row-style="height: 60px" style="width: 100%" stripe border>
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="账号"
            prop="username">
          </el-table-column>
          <el-table-column
            label="昵称"
            prop="nickname">
          </el-table-column>
          <el-table-column
            label="空间容量"
            prop="space">
          </el-table-column>
          <el-table-column
            label="已用空间"
            prop="spaceUsed">
          </el-table-column>
          <el-table-column
            label="注册时间"
            prop="createDate">
          </el-table-column>
          <el-table-column
            align="center">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入账号搜索"/>
            </template>
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="">重置密码</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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

    export default {
        name: "UserInfo",
        components:{
            'Pagination': Pagination
        },
        data(){
            return {
                tableData: [],
                search: '',
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
            getAllUser(){
                let that = this;
                let loading = that.$loading.service({
                    text: '正在加载',
                    spinner: "el-icon-loading",
                    lock: true,
                    target: document.querySelector('.table')
                });
                this.$axios.get(that.$api.user.getList, {
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

    .table {
      margin-top: 20px;
    }

    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top:20px;
    }
  }
</style>
