<template>
  <el-dialog
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :title="titleName"
    :visible.sync="bShow"
    :show-close="false"
    :before-close="back">
    <div class="content">
      <el-form
        v-loading="loading"
        ref="refForm"
        :model="dataForm"
        :rules="rules"
        label-width="100px"
        label-position="top">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="模型ID" prop="gcodeId">
              <el-input v-model="dataForm.gcodeId" disabled="true" type="text"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发布人账号" prop="userName">
              <el-input v-model="dataForm.userName" disabled type="text"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="模型名称" prop="gcodeName">
              <el-input v-model="dataForm.gcodeName" :maxlength="20" placeholder="请输入模型名称" type="text"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="类别" prop="typeId">
              <el-select v-model="gType" placeholder="请选择" @change="changeType" style="width: 100%">
                <el-option
                  v-for="item in options_type"
                  :key="item.typeId"
                  :label="item.typeName"
                  :value="item.typeId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
<!--          <el-col :span="8">-->
<!--            <el-form-item label="状态" prop="statusId">-->
<!--              <el-select v-model="gStatus" placeholder="请选择" @change="changeStatus" style="width: 100%">-->
<!--                <el-option-->
<!--                  v-for="item in options_status"-->
<!--                  :key="item.statusId"-->
<!--                  :label="item.statusName"-->
<!--                  :value="item.statusId">-->
<!--                </el-option>-->
<!--              </el-select>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="文件 (gcode)" prop="gcodeFile">
              <el-upload
                class="upload-demo"
                action="#"
                ref="gcodeFile"
                :auto-upload="false"
                :http-request="newGcodeFile"
                :on-remove="handleRemove_file"
                limit="1"
                accept=".gcode">
                <el-button size="small" type="primary">重新上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="图片(封面)" prop="homePic">
              <el-upload
                class="upload-demo"
                action="#"
                ref="homePic"
                :auto-upload="false"
                :http-request="newHomePic"
                :on-remove="handleRemove_home"
                limit="1"
                accept=".jpg,.jpeg,.png,.bmp,.JPG,.JPEG,.BMP,.PNG">
                <el-button size="small" type="primary">重新上传</el-button>
                <!--                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="预览图 (最多3张)" prop="prePic">
              <el-upload
                class="upload-demo"
                action="#"
                ref="prePic"
                :auto-upload="false"
                :http-request="newPrePic"
                :on-remove="handleRemove_pre"
                limit="3"
                accept=".jpg,.jpeg,.png,.bmp,.JPG,.JPEG,.BMP,.PNG">
                <el-button size="small" type="primary">重新上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="说明" prop="intro">
              <el-input
                type="textarea"
                maxlength="80"
                show-word-limit
                placeholder="请输入内容"
                v-model="dataForm.intro">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer" style="text-align:center;">
      <el-button @click="back()">取 消</el-button>
      <el-button :loading="submitLoading" type="primary" @click="submitUpload('refForm')">确 定</el-button>
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
            gcodeId: {
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
            return {
                //将所有上传元素添加到同一个表单中
                newForm: new FormData(),
                submitLoading: false,
                loading: true,
                titleName: '编辑',
                dataForm: {},
                options_type: {},
                // options_status: {},
                gType: '',
                gStatus: '',
                fileList1: '',
                rules: {
                    gcodeName: [
                        {required: true, message: '模型名不能为空', trigger: 'blur'},
                        {validator: validate0, trigger: 'blur'}
                    ]
                }
            };
        },
        mounted(){
            this.getGcodeInfo();
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
            changeType(value){
                this.dataForm.typeId = value;
            },
            // changeStatus(value){
            //     this.dataForm.statusId = value;
            // },
            back(done) {
                this.$emit('update:bShow', false);
                this.clearForm();
            },
            //获取模型信息
            getGcodeInfo(){
                let that = this;
                that.loading = true;
                that.$axios.get(that.$api.gcodeInfo.getOne, {
                    params: {
                        gcodeId: that.gcodeId
                    }
                }).then(res => {
                      that.loading = false;
                      if (res) {
                          that.dataForm = res.data.data;
                          that.gType = res.data.data.typeName;
                          that.gStatus = res.data.data.statusName;
                          that.getType();
                          // that.getStatus();
                      }
                }).catch(res => {
                    loading.close();
                });

            },
            getType(){
                let that = this;
                that.$axios.get(that.$api.gcodeType.getItems)
                    .then(res => {
                        if(res){
                            that.options_type = res.data.data
                        }
                    }).catch(res => {
                })
            },
            // getStatus(){
            //     let that = this;
            //     that.$axios.get(that.$api.gcodeStatus.getItems)
            //         .then(res => {
            //             if(res){
            //                 that.options_status = res.data.data
            //             }
            //         }).catch(res => {
            //     })
            // },
            //移除封面
            handleRemove_home(file) {
                this.newForm.delete("homePic");
            },
            //移除预览图
            handleRemove_pre(file) {
                this.newForm.delete("prePic");
            },
            //移除文件
            handleRemove_file(file){
                this.newForm.delete("gcodeFile");
            },
            //自定义submit
            newHomePic(file) {
                this.newForm.append('homePic', file.file);
            },
            newPrePic(file) {
                this.newForm.append('prePic', file.file);
            },
            newGcodeFile(file) {
                this.newForm.append('gcodeFile', file.file);
            },
            submitUpload(form) {
                let that = this;

                this.$refs.homePic.submit();
                this.$refs.prePic.submit();
                this.$refs.gcodeFile.submit();

                if(this.newForm.get("gcodeFile") != null){
                    let format = this.newForm.get("gcodeFile").name.replace(/.+\./, "");
                    if(['gcode'].indexOf(format.toLowerCase()) === -1){
                        this.$message.error("请上传正确的文件格式：gcode");
                        return;
                    }
                }

                if(this.newForm.get("homePic") != null){
                    let format = this.newForm.get("homePic").name.replace(/.+\./, "");
                    if(['jpg','jpeg','png','bmp'].indexOf(format.toLowerCase()) === -1){
                        this.$message.error("请上传正确的封面格式：jpg、jpeg、png、bmp");
                        return;
                    }
                }

                if(this.newForm.get("prePic") != null){
                    let format2 = this.newForm.get("prePic").name.replace(/.+\./, "");
                    if(['jpg','jpeg','png','bmp'].indexOf(format2.toLowerCase()) === -1){
                        this.$message.error("请上传正确的预览图格式：jpg、jpeg、png、bmp");
                        return;
                    }
                }
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        that.submitLoading = true;

                        this.newForm.append("gcodeId",that.dataForm.gcodeId);
                        this.newForm.append('fileName', that.dataForm.gcodeName);
                        this.newForm.append('typeId', that.dataForm.typeId);
                        // this.newForm.append('statusId', that.dataForm.statusId);
                        this.newForm.append('intro', that.dataForm.intro);

                        this.$axios.post(this.$api.gcodeInfo.update,
                            this.newForm
                        ).then(res => {
                            setTimeout(function () {
                                that.submitLoading = false;
                                if(res){
                                    that.$message.success("修改成功");
                                    that.back();
                                    that.$emit('refresh');
                                }
                            },500);
                        }).catch(res => {
                            that.submitLoading = false;
                        });

                    }
                })
            },
            clearForm(){
                this.$refs.homePic.clearFiles();
                this.$refs.prePic.clearFiles();
                this.$refs.gcodeFile.clearFiles();
                this.$refs.refForm.resetFields();
                this.newForm = new FormData();
            }
        }
    }
</script>

<style scoped>

</style>
