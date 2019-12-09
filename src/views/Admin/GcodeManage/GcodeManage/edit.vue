<template>
  <el-dialog
    close-on-click-modal="false"
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
            <el-form-item label="模型名称" prop="gcodeName">
              <el-input v-model="dataForm.gcodeName" :maxlength="20" placeholder="请输入模型名称" type="text"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="发布人" prop="username">
              <el-input v-model="dataForm.username" disabled type="text"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="类别" prop="typeId">
              <el-select v-model="dataForm.typeId" placeholder="请选择" style="width: 100%">
                <el-option
                  v-for="item in options_type"
                  :key="item.typeId"
                  :label="item.typeName"
                  :value="item.typeId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="文件" prop="gcodeFile">
              <el-upload
                class="upload-demo"
                action="#"
                :auto-upload="false"
                :on-change="handleChange"
                :file-list="fileList">
                <el-button size="small" type="primary">重新上传</el-button>
<!--                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="图片(封面)" prop="homePic">
              <el-upload
                class="upload-demo"
                action="#"
                :auto-upload="false"
                :on-change="handleChange"
                :file-list="fileList">
                <el-button size="small" type="primary">重新上传</el-button>
                <!--                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="预览图1" prop="prePic1">
              <el-upload
                class="upload-demo"
                action="#"
                :auto-upload="false"
                :on-change="handleChange"
                :file-list="fileList">
                <el-button size="small" type="primary">重新上传</el-button>
                <!--                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预览图2" prop="prePic2">
              <el-upload
                class="upload-demo"
                action="#"
                :auto-upload="false"
                :on-change="handleChange"
                :file-list="fileList">
                <el-button size="small" type="primary">重新上传</el-button>
                <!--                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="预览图3" prop="prePic3">
                <el-upload
                  class="upload-demo"
                  action="#"
                  :auto-upload="false"
                  :on-change="handleChange"
                  :file-list="fileList">
                  <el-button size="small" type="primary">重新上传</el-button>
                  <!--                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
                </el-upload>
              </el-form-item>
            </el-col>
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
            return {
                loading: false,
                titleName: '编辑',
                dataForm: {
                    gcodeId: '',
                    gcodeName: '',
                    username: '',
                    typeId: '',
                    intro: ''
                },
            };
        },
        mounted(){
            this.getGcodeInfo();
        },
        methods:{
            back(done) {
                this.$emit('update:bShow', false)
            },
            //获取模型信息
            getGcodeInfo(){
                let that = this;
                that.loading = true;

                that.$axios.get(that.$api.gcodeInfo.getGcodeInfo, {
                    params: {
                        gcodeId: that.gcodeId
                    }
                }).then(res => {
                    console.log(res);
                    setTimeout(function () {
                        that.loading = false;
                        if (res.code === 200) {
                            console.log(res);

                            that.dataForm = res.data[0];
                        }
                    },500)

                }).catch(res => {
                    loading.close();
                    console.log(res);
                })
            }
        }
    }
</script>

<style scoped>

</style>
