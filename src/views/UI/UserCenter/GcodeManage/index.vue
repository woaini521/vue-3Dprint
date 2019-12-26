<template>
  <div class="main">
    <el-divider content-position="left"><span style="color: #f4516c; font-weight: bold">模型管理</span></el-divider>
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
                  <el-image :src="httpUrl + scope.row[key]" :preview-src-list="[httpUrl + scope.row[key]]"
                            style="width: 50%;"></el-image>
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
                <el-button size="mini" type="info" @click="handleDownload(scope.$index, scope.row.gcodePath)">下载
                </el-button>
                <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row.gcodeId)">编辑
                </el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row.gcodeId)">删除
                </el-button>
                <!--                <el-button size="mini" type="info" @click="handleDelete(scope.$index, scope.row.typeId)">查看评论</el-button>-->
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
          :gcode-id="gcodeId"
          @refresh="getAllGcode"
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
        name: "index",
        components: {Pagination, SearchView, EditPage},
        data() {
            return {
                loading: false,
                //表格列
                colums: columModel.new(),

                //表格选择
                multipleSelection: [],
                tableData: [],
                //访问路径
                httpUrl: this.$store.state.httpUrl,

                totalSize: 0,//总条数
                pageQuery: {
                    page: {
                        size: 10,//每页显示的条目数
                        current: 1 //当前页
                    },
                    //查询条件
                    query: {},
                },

                gcodeId: '',
                showEditPage: false,
            };
        },
        mounted() {
            this.pageQuery.query['userName'] = this.$store.state.TOKEN.name;
            this.getAllGcode();
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //点击搜索
            search(model) {
                this.pageQuery.query = model;
                this.pageQuery.query['userName'] = this.$store.state.TOKEN.name;
                this.getAllGcode();
            },
            pageChange(page) {
                this.pageQuery.page.current = page.currentPage;
                this.pageQuery.page.size = page.pageSize;
            },
            /**
             * 获取模型信息
             */
            getAllGcode() {
                let that = this;
                let loading = that.$loading.service({
                    text: '正在加载',
                    lock: true,
                    target: document.querySelector('.el-table')
                });
                that.$axios.post(that.$api.gcodeInfo.getAllGcode,
                    that.pageQuery
                ).then(res => {
                    setTimeout(function () {
                        loading.close();
                        if (res) {
                            that.totalSize = res.data.data.total;
                            that.tableData = res.data.data.records;
                        }
                    }, 500)
                }).catch(res => {
                    loading.close();
                })
            },
            //编辑
            handleEdit(index, gcodeId) {
                this.gcodeId = gcodeId;
                this.showEditPage = true;
            },
            //下载
            handleDownload(index, path) {
                window.open(this.httpUrl + path, "_parent");
            },
            //删除
            handleDelete(index, gcodeId) {
                let that = this;
                that.$messageBox.confirm("是否删除？", "确认", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.$axios.delete(that.$api.gcodeInfo.delete, {
                        params: {
                            gcodeId: gcodeId
                        }
                    }).then(res => {
                        if (res) {
                            that.$message.success("删除成功");
                        }
                        that.getAllGcode();
                    }).catch(res => {
                    })
                }).catch(() => {
                })
            },
            doMulDelete() {
                let that = this;
                if (this.multipleSelection.length === 0) {
                    this.$message.error("请选择一个或多个删除");
                    return;
                }
                that.$messageBox.confirm("是否批量删除？", "确认", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const array = [];
                    that.multipleSelection.forEach((e) => {
                        array.push(e.gcodeId)
                    });
                    const gcodeIds = array.join(',');
                    that.$axios.delete(that.$api.gcodeInfo.deleteMul, {
                        params: {
                            gcodeIds: gcodeIds
                        }
                    }).then(res => {
                        if (res) {
                            that.$message.success("批量删除成功");
                        }
                        that.getAllGcode()
                    }).catch(res => {
                    })
                }).catch(() => {

                })
            }
        }
    }
</script>

<style lang="scss" scoped>
  .main {
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 8px;

    .body {
      width: 95%;
      margin-left: 2.5%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      /*align-items: center;*/
      padding: 20px 0;

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
  }
</style>
