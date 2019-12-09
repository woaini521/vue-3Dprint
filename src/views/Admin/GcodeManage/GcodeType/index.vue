<template>
  <div>
    <div class="body">
      <div class="search">
        <SearchView :colums="colums" @query="search"></SearchView>
        <div class="btn">
          <el-button type="primary" icon="el-icon-edit" @click="showDialog">添加类型</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="doMulDelete">批量删除</el-button>
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
              width="auto"
              align="center"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row.typeId)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row.typeId)">删除</el-button>
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
<!--    添加类型-->
    <div class="dialog">
      <el-dialog title="添加类型" :visible.sync="showAddTypeDialog" center :append-to-body="true" width="500px"
                 :show-close="false">
        <el-form :model="addForm" :rules="addRules" ref="addForm" status-icon label-width="auto" label-position="left"
                 size="medium" style="width: 100%; display: flex; flex-direction: column;align-items: center">
          <div style="text-align: left">
            <el-form-item label="类型名" prop="typename">
              <el-input v-model="addForm.typename" autocomplete="off" placeholder="请输入类型名"></el-input>
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm('addForm')">取 消</el-button>
          <el-button type="primary" @click="addType('addForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
<!--    编辑类型-->
    <div class="dialog">
      <el-dialog title="编辑类型" :visible.sync="showEditTypeDialog" center :append-to-body="true" width="500px"
                 :show-close="false">
        <el-form :model="editForm" :rules="editRules" ref="editForm" status-icon label-width="auto" label-position="left"
                 size="medium" style="width: 100%; display: flex; flex-direction: column;align-items: center">
          <div style="text-align: left">
            <el-form-item label="类型名" prop="typename">
              <el-input v-model="editForm.typename" autocomplete="off" placeholder="请输入类型名"></el-input>
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm('editForm')">取 消</el-button>
          <el-button type="primary" @click="editType('editForm')">保 存</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
    import Pagination from '@/components/Pagination';
    import SearchView from '@/components/SearchView';
    import columModel from './model/columModel';


    export default {
        name: "GcodeType",
        components: {Pagination, SearchView},
        mounted() {
            this.getAllType();
        },
        inject: ['reload'],
        data() {
            return {
                //表格列
                colums: columModel.new(),
                //查询条件
                query: {},
                //表格选择
                multipleSelection: [],

                //添加类型Dialog
                showAddTypeDialog: false,
                //编辑类型Dialog
                showEditTypeDialog: false,
                //添加类型表单
                addForm: {
                    typename: ''
                },
                //编辑类型表单
                editForm: {
                    typeID: -1,
                    typename: '',
                    index: -1
                },
                //数据表
                tableData: [],
                //分页
                page: {
                    totalSize: 0,//总条数
                    pageSize: 10,//每页显示的条目数
                    currentPage: 1 //当前页
                },
                addRules: {
                    typename: [
                        {required: true, message: '类型名不能为空', trigger: 'blur'}
                    ],
                },
                editRules: {
                    typename: [
                        {required: true, message: '类型名不能为空', trigger: 'blur'}
                    ],
                }
            };
        },
        methods: {
            //点击搜索
            search(model) {
                this.query = model;
                this.getAllType();
            },
            //展示添加对话框
            showDialog() {
                this.showAddTypeDialog = true;
            },
            //改变页数
            pageChange(page) {
                this.page.currentPage = page.currentPage;
                this.page.pageSize = page.pageSize;
                this.getAllType();
            },
            // 重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.showAddTypeDialog = false;
                this.showEditTypeDialog = false;
            },
            //表格多选
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //编辑按钮
            handleEdit(index, typeID) {
                this.showEditTypeDialog = true;
                this.editForm.index = index;
                this.editForm.typeID = typeID;
                this.editForm.typename = this.tableData[index].typeName;
            },
            //编辑类型
            editType(form){
                let that = this;
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        let index = that.editForm.index;
                        if(that.editForm.typename === that.tableData[index].typeName){
                            that.$message.error("类型名已存在");
                        }else{
                            that.$axios.put(that.$api.gcodeType.updateType,{
                                typeID: that.editForm.typeID,
                                typeName: that.editForm.typename
                            }).then(res => {
                                if(res.code === 200){
                                    setTimeout(function () {
                                        that.getAllType();
                                    },500);
                                }
                            }).catch(res => {
                            });
                            that.resetForm(form);
                        }
                    }
                });
            },
            //单个删除按钮
            handleDelete(index, typeID) {
                let that = this;
                that.$messageBox.confirm("是否删除？", "确认", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    that.$axios.delete(that.$api.gcodeType.deleteType, {
                        params:{
                            typeID: typeID
                        }
                    }).then(res => {
                        if (res.code === 200) {
                            setTimeout(function () {
                                that.getAllType()
                            }, 500);
                        }
                    }).catch(res => {
                        console.log(res)
                    })
                }).catch(() => {
                    console.log(res)
                })
            },
            //批量删除
            doMulDelete() {
                let that = this;
                if (this.multipleSelection.length === 0) {
                    this.$message.error("请选择一个或多个删除");
                    return;
                }
                that.$messageBox.confirm("是否删除？","确认",{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const array= [];
                    that.multipleSelection.forEach((e) => {
                        array.push(e.typeId)
                    });
                    const typeIDs = array.join(',');
                    that.$axios.delete(that.$api.gcodeType.deleteTypeMul,{
                        params:{
                            typeIDs: typeIDs
                        }
                    }).then(res => {
                        if(res.code === 200){
                            setTimeout(function () {
                                that.getAllType()
                            }, 500);
                        }
                    }).catch(res => {
                        console.log(res);
                    })
                }).catch(() => {

                })
            },
            /**
             * 添加类型
             */
            addType(form) {
                let that = this;
                that.$refs[form].validate((valid) => {
                    if (valid) {
                        that.$axios.post(that.$api.gcodeType.addType, {
                            newType: that.addForm.typename
                        }).then(res => {
                            if (res.code === 200) {
                                setTimeout(function () {
                                    that.getAllType()
                                }, 500);
                            }
                        }).catch(res => {
                            console.log(res);
                        })
                    }
                });
                that.resetForm(form);
            },
            /**
             * 获取所有类型
             */
            getAllType() {
                let that = this;
                let loading = that.$loading.service({
                    text: '正在加载',
                    // spinner: "el-icon-loading",
                    lock: true,
                    target: document.querySelector('.el-table')
                });
                that.$axios.get(that.$api.gcodeType.getAllType, {
                    params: {
                        currentPage: this.page.currentPage,
                        pageSize: this.page.pageSize,
                        query: this.query
                    }
                }).then(res => {
                    console.log(res);
                    loading.close();
                    if (res.code === 200) {
                        that.page.totalSize = res.data[1][0];
                        that.tableData = res.data[0];
                    }
                }).catch(res => {
                    loading.close();
                    console.log(res);
                })
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
