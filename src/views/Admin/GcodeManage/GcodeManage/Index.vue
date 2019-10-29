<template>
  <div class="body">
    <div class="btn">
      <el-button type="danger" icon="el-icon-delete" size="small" @click="showDialog">批量删除</el-button>
    </div>
    <div class="table">
      <el-table :data="tableData.filter(data => !search || data.typename.toLowerCase().includes(search.toLowerCase()))"
                 height="675px" header-row-style="height:75px" row-style="height: 60px" style="width: 100%" stripe>
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="编号"
          prop="id">
        </el-table-column>
        <el-table-column
          label="名称"
          prop="gcodename">
        </el-table-column>
        <el-table-column
          label="缩略图"
          prop="img">
        </el-table-column>
        <el-table-column
          label="发布用户"
          prop="username">
        </el-table-column>
        <el-table-column
          label="类型名"
          prop="typename">
        </el-table-column>
        <el-table-column
          label="发布时间"
          prop="createDate">
        </el-table-column>
        <el-table-column
          label="人气"
          prop="popular">
        </el-table-column>
        <el-table-column
          label="大小"
          prop="size">
        </el-table-column>
        <el-table-column
          fixed="right"
          width="340"
          align="center">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入类型名搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">下载</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-button
              size="mini"
              type="info"
              @click="handleDelete(scope.$index, scope.row)">查看评论</el-button>
          </template>
        </el-table-column>
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

    export default {
        name: "GcodeManage",
        components:{
            'Pagination': Pagination
        },
        data(){
            return{
              tableData: [{
                  id: 1,
                  gcodename: 'sss',
                  img: '',
                  username: '小王',
                  typename: '日用品',
                  createDate: '1111',
                  popular: 10,
                  size: 2000
              }],
                search: '',
                page:{
                    totalSize: 0,//总条数
                    pageSize: 10,//每页显示的条目数
                    currentPage: 1 //当前页
                }
            };
        },
        mounted(){
          console.log("mounted");
        },
        methods:{
            pageChange(page){
                this.page.currentPage = page.currentPage;
                this.page.pageSize = page.pageSize;
            }
        }
    }
</script>

<style lang="scss" scoped>
  .body{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .btn{
      text-align: right;
    }
    .table{
      margin-top: 10px;
      padding-bottom: 20px;
      background: #fff;
      .pagination{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
      }
    }
  }

</style>
