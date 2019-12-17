<template>
  <el-dialog
    close-on-click-modal="false"
    :title="titleName"
    :visible.sync="bShow"
    :show-close="false"
    :before-close="back">
      <el-form
        v-loading="loading"
        ref="refForm"
        :model="dataForm"
        :rules="rules"
        label-width="120px"
        label-position="left"
        element-loading-text="拼命加载中">
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="dataForm.userName" disabled="true" type="text"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-form-item label="昵称" prop="nickName">
              <el-input v-model="dataForm.nickName" :maxlength="20" placeholder="请输入昵称" type="text"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-form-item label="可用空间 (字节)" prop="space">
              <el-input v-model.number="dataForm.space" type="text"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-form-item label="已用空间 (字节)" prop="spaceUsed">
              <el-input v-model.number="dataForm.spaceUsed" type="text"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    <div slot="footer" class="dialog-footer" style="text-align:center;">
      <el-button @click="back(false)">取 消</el-button>
      <el-button :loading="submitLoading" type="primary" @click="saveForm('refForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
    export default {
        props: {
            bShow: {
                type: Boolean,
                default: false
            },
            userId: {
                type: String,
                default: ''
            },
            editMode: {
                type: Boolean,
                default: false
            }
        },
        name: "edit",
        data() {
            const validate0 = (rule, value, callback) => {
                if(!this.checkSpecialKey(value)){
                    callback(new Error('不能使用特殊字符'));
                } else {
                    callback();
                }
            };
            const validate1 = (rule, value, callback) => {
                if(value < 0){
                    callback(new Error('可用空间不能小于0'));
                }
                if (value < this.dataForm.spaceUsed) {
                    callback(new Error('已用空间不能大于可用空间'));
                } else {
                    callback();
                }
            };
            const validate2 = (rule, value, callback) => {
                if(value < 0){
                    callback(new Error('已用空间不能小于0'));
                }
                if (value > this.dataForm.space) {
                    callback(new Error('已用空间不能大于可用空间'));
                } else {
                    callback();
                }
            };
            return {
                loading: true,
                titleName: '编辑',
                dataForm: {},
                submitLoading: false,

                rules: {
                    nickName: [
                        {min: 3, max: 10,message: '昵称限制3-10个字符', trigger: 'blur'},
                        {required: true, message: '昵称不能为空', trigger: 'blur'},
                        {validator: validate0, trigger: 'blur'}
                    ],
                    space: [
                        {required: true, message: '可用空间不能为空', trigger: 'blur'},
                        {type: 'number', message: '请输入数字', trigger: 'blur'},
                        {validator: validate1, trigger: 'blur'}
                    ],
                    spaceUsed: [
                        {required: true, message: '已用空间不能为空', trigger: 'blur'},
                        {type: 'number', message: '请输入数字', trigger: 'blur'},
                        {validator: validate2, trigger: 'blur'}
                    ]
                }
            };
        },
        mounted(){
            this.getUser();
        },
        methods:{
            checkSpecialKey(str) {
                const specialKey = "[`~!#$^&*()=|{}':;'\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘' ";
                for (let i = 0; i < str.length; i++) {
                    if (specialKey.indexOf(str.substr(i, 1)) !== -1) {
                        return false;
                    }
                }
                return true;
            },
            back(done) {
                this.$emit('update:bShow', false);
                if(done){
                    this.$emit('refresh');
                }
            },
            //获取模型信息
            getUser(){
                let that = this;
                that.loading = true;
                that.$axios.get(that.$api.userInfo.getOne, {
                    params: {
                        userId: that.userId
                    }
                }).then(res => {
                    setTimeout(function () {
                        that.loading = false;
                        if (res) {
                            that.dataForm = res.data.data;
                            that.dataForm.space = parseInt(that.dataForm.space)
                            that.dataForm.spaceUsed = parseInt(that.dataForm.spaceUsed)
                        }
                    },500)
                }).catch(res => {
                    loading.close();
                })
            },
            saveForm(form){
                let that = this;
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        that.submitLoading = true;
                        that.$axios.put(that.$api.userInfo.update,
                          that.dataForm
                        ).then(res => {
                            that.submitLoading = false;
                            if(res){
                                that.$message.success("修改成功");
                            }
                            that.back(true);
                        }).catch(res => {
                            that.submitLoading = false;
                        })
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>
