<template>
  <div>
  <div class="body">
    <div class="btn">
      <el-button type="primary" icon="el-icon-edit" size="small" @click="showDialog">添加类型</el-button>
      <el-button type="danger" icon="el-icon-delete" size="small" @click="showDialog">批量删除</el-button>
    </div>
    <div class="table">
      <el-table :data="tableData.filter(data => !search || data.typename.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*pagesize,currentPage*pagesize)"
                ref="multipleTable" tooltip-effect="dark" height="675px" header-row-style="height:75px" row-style="height: 60px" style="width: 100%" stripe border>
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="编号"
          prop="id">
        </el-table-column>
        <el-table-column
          label="类型名"
          prop="typename">
        </el-table-column>
        <el-table-column
          label="添加时间"
          prop="createDate">
        </el-table-column>
        <el-table-column
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
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="pageChange"
        :total="totalSize">
      </el-pagination>
    </div>
  </div>


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
        <el-button @click="resetAddForm('addForm')">取 消</el-button>
        <el-button type="primary" @click="addType('addForm')">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
    export default {
        name: "GcodeType",
        data(){
            return{
                //添加类型Dialog
                showAddTypeDialog: false,
                //表单
                addForm: {},
                //数据表
                tableData: [{
                    id: 1,
                    typename: '玩具',
                    createDate: '1111'
                },
                    {
                        id: 2,
                        typename: '小玩具',
                        createDate: '3331'
                    }],
                totalSize: 0, //总条数
                pagesize: 10, //每页显示的条目数
                currentPage: 1, //当前页
                search: '',
                addRules:{
                    typename:[
                        { required: true, message: '类型名不能为空', trigger: 'blur' }
                    ],
                },
            };
        },
        methods:{
            showDialog(){
                this.showAddTypeDialog = true;
            },
            addType(form){
                var that = this;
                that.$refs[form].validate((valid) =>{
                    if(valid){
                        //
                    }
                });
            },
            pageChange(page){
                this.currentPage = page
            },
            // 重置表单
            resetAddForm(formName) {
                this.showAddTypeDialog = false;
                this.$refs[formName].resetFields();
            },
        }
    }
</script>

<style lang="scss" scoped>
  .body {
    width: 100%;

    .btn {
      text-align: right;
    }

    .table {
      margin-top: 10px;
    }

    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 40px;
    }
  }

</style>
