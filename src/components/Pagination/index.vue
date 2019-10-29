<template>
  <div class="pagination-container">
    <el-pagination
      background
      :current-page.sync="page.currentPage"
      :page-size.sync="page.pageSize"
      :layout="layout"
      :page-sizes='pageSizes'
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
    export default {
        name: "Pagination",
        props: {
            total: [Number, String],
            layout: {
                type: String,
                default: 'total, sizes, prev, pager, next, jumper'
            }
        },
        data(){
            return {
                pageSizes: [10, 20, 30, 50],
                page: {
                    currentPage: 1,
                    pageSize: 10
                }
            };

        },
        methods: {
            handleSizeChange(val) {
                this.page.currentPage = 1;
                this.page.pageSize = val;
                this.$emit('pageChange',this.page);
            },
            handleCurrentChange(val) {
                this.page.currentPage = val;
                this.$emit('pageChange',this.page);
            }
        }
    }
</script>

<style scoped>
  .pagination-container {
    /*background: #fff;*/
  }
</style>
