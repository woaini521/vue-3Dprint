<template>
  <div class="main">
    <el-divider content-position="left"><span style="color: #f4516c; font-weight: bold">上传模型</span></el-divider>
    <div class="body">
      <div class="upload">
          <el-row :gutter="24" type="flex" justify="center">
            <el-col :span="24">
              <div class="part">
                <el-divider content-position="left"><span>封面</span>
                </el-divider>
                <div class="center">
                    <el-upload
                      class="upload-demo"
                      :action=action
                      list-type="picture-card"
                      :auto-upload="false"
                      :http-request="newHomePic"
                      accept=".jpg,.jpeg,.png,.bmp,.JPG,.JPEG,.BMP,.PNG"
                      ref="homePic"
                      limit="1">
                      <i slot="default" class="el-icon-plus"></i>
                      <div slot="file" slot-scope="{file,fileList}">
                        <img
                          class="el-upload-list__item-thumbnail"
                          :src="file.url" alt="">
                        <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview_home(file)">
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span
                      class="el-upload-list__item-delete"
                      @click="handleRemove_home(file)">
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                      </div>
                    </el-upload>
                    <div class="el-upload__tip">*选择一张图片作为封面(<span style="color: red">必选</span>)</div>
                </div>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="24" type="flex" justify="center">
            <el-col :span="24">
              <div class="part">
                <el-divider content-position="left"><span>预览图</span>
                </el-divider>
                <!--      <span style="text-align: center;font-weight: bold;margin-right: 20px;color:#99a9bf;">选择图片:</span>-->
                <div class="center">
                  <el-upload
                    class="upload-demo"
                    :action=action
                    list-type="picture-card"
                    :auto-upload="false"
                    :http-request="newPrePic"
                    accept=".jpg,.jpeg,.png,.bmp,.JPG,.JPEG,.BMP,.PNG"
                    ref="prePic"
                    limit="3">

                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file,fileList}">
                      <img
                        class="el-upload-list__item-thumbnail"
                        :src="file.url" alt=""
                      >
                      <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview_pre(file)">
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span
                      class="el-upload-list__item-delete"
                      @click="handleRemove_pre(file)">
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                    </div>
                  </el-upload>
                  <div class="el-upload__tip">*最多添加3张图片</div>
                </div>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="24" type="flex" justify="center">

                  <el-col :span="24">
                    <div class="part">
                    <el-divider content-position="left"><span>模型</span></el-divider>

                    <div class="center">
                        <el-upload
                          class="upload-demo_file"
                          ref="gcodeFile"
                          :action=action
                          :auto-upload="false"
                          :http-request="newGcodeFile"
                          :on-remove="handleRemove_file"
                          limit="1"
                          drag
                          accept=".gcode"
                        >
                          <i class="el-icon-upload"></i>
                          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                          <div class="el-upload__tip" slot="tip">*只能上传GCODE文件</div>
                        </el-upload>
                    </div>
                    </div>
                  </el-col>
          </el-row>
          <el-row :gutter="24" type="flex" justify="center">

                  <el-col :span="24">
                    <div class="part">
                      <el-divider content-position="left"><span>详情</span></el-divider>
                      <el-form ref="uploadForm" :model="uploadForm" :rules="rules" label-position="right" label-width="70px">
                      <el-form-item label="模型名" prop="fileName">
                          <el-input type="text" autocomplete="off" placeholder="请输入模型名" size="small"
                                    v-model="uploadForm.fileName"></el-input>
                      </el-form-item>

                      <el-form-item label="类型" prop="typeId">
                          <el-select v-model="uploadForm.typeId" placeholder="请选择" style="width: 100%" size="small">
                            <el-option
                              v-for="item in options_type"
                              :key="item.typeId"
                              :label="item.typeName"
                              :value="item.typeId">
                            </el-option>
                          </el-select>
                      </el-form-item>

                      <!--                  <el-form-item label="" prop="statusId">-->
                      <!--                    <div class="line_style">-->
                      <!--                      <span class="label_style">*状态:&emsp;&emsp;</span>-->
                      <!--                      <el-select v-model="uploadForm.statusId" placeholder="请选择" style="width: 100%" size="small">-->
                      <!--                        <el-option-->
                      <!--                          v-for="item in options_status"-->
                      <!--                          :key="item.statusId"-->
                      <!--                          :label="item.statusName"-->
                      <!--                          :value="item.statusId">-->
                      <!--                        </el-option>-->
                      <!--                      </el-select>-->
                      <!--                    </div>-->
                      <!--                  </el-form-item>-->

                      <el-form-item label="说明" prop="intro">
                          <el-input
                            type="textarea"
                            maxlength="80"
                            show-word-limit
                            placeholder="请输入内容"
                            size="small"
                            v-model="uploadForm.intro">
                          </el-input>
                      </el-form-item>
                      </el-form>
                        <div class="btn">
                          <el-button :loading="loading" style="" size="small" type="primary" @click="submitUpload('uploadForm')">上传</el-button>
                          <el-button style="margin-left: 40px;" size="small" type="danger" @click="clearForm">重置
                          </el-button>
                        </div>
                    </div>
                  </el-col>
          </el-row>

      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "index",

        data() {
            const validate0 = (rule, value, callback) => {
                if(!this.checkSpecialKey(value)){
                    callback(new Error('不能使用特殊字符'));
                } else {
                    callback();
                }
            };
            return {
                uploadForm: {
                    fileName: '',
                    typeId: '',
                    intro: ''
                },
                //将所有上传元素添加到同一个表单中
                newForm: new FormData(),
                rules: {
                    fileName: [
                        {required: true, message: '*文件名不能为空', trigger: 'blur'},
                        {validator: validate0, trigger: 'blur'}
                    ],
                    typeId: [
                        {required: true, message: '*类别不能为空', trigger: 'blur'}
                    ]
                },
                action: '#',
                dialogImageUrl: '',
                dialogVisible: false,
                //类型选择
                options_type: [],
                loading: false,
            };
        },
        mounted(){
            this.getType();
        },
        methods: {
            // 特殊字符校验
            checkSpecialKey(str) {
                const specialKey = "[`~!#$^&*()=|{}':;'\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘' ";
                for (let i = 0; i < str.length; i++) {
                    if (specialKey.indexOf(str.substr(i, 1)) !== -1) {
                        return false;
                    }
                }
                return true;
            },
            getType(){
                let that = this;
                that.$axios.get(that.$api.gcodeType.getItems)
                    .then(res => {
                        if(res){
                            that.options_type = res.data.data;
                        }
                    }).catch(res => {
                })
            },
            //移除封面
            handleRemove_home(file) {
                this.$refs.homePic.handleRemove(file);
                this.newForm.delete("homePic");
            },
            //预览图片
            handlePictureCardPreview_home(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            //移除预览图
            handleRemove_pre(file) {
                this.$refs.prePic.handleRemove(file);
                this.newForm.delete("prePic");
            },
            //预览图片
            handlePictureCardPreview_pre(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
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

                if(this.newForm.get("gcodeFile") == null){
                    this.$message.error("请选择文件");
                    return;
                }else{
                    let format = this.newForm.get("gcodeFile").name.replace(/.+\./, "");
                    if(['gcode'].indexOf(format.toLowerCase()) === -1){
                        this.$message.error("请上传正确的文件格式：gcode");
                        return;
                    }
                }

                if(this.newForm.get("homePic") == null){
                    this.$message.error("请选择封面");
                    return;
                }else{
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
                        that.loading = true;

                        this.newForm.append("userName",this.$store.state.TOKEN.name);
                        this.newForm.append('fileName', this.uploadForm.fileName);
                        this.newForm.append('typeId', this.uploadForm.typeId);
                        this.newForm.append('intro', this.uploadForm.intro);

                        this.$axios.post(this.$api.gcodeInfo.upload,
                            this.newForm
                        ).then(res => {

                            setTimeout(function () {
                                that.loading = false;
                                if(res){
                                    that.$message.success("上传成功");
                                    that.$refs.homePic.clearFiles();
                                    that.$refs.prePic.clearFiles();
                                    that.$refs.gcodeFile.clearFiles();

                                    that.$refs[form].resetFields();
                                    that.newForm = new FormData();
                                }
                            },500);
                        }).catch(res => {
                            that.loading = false;
                        });

                    }
                })
            },
            clearForm(){
                this.$refs.homePic.clearFiles();
                this.$refs.prePic.clearFiles();
                this.$refs.gcodeFile.clearFiles();
                this.$refs.uploadForm.resetFields();
                this.newForm = new FormData();
            }
        }
    }
</script>

<style lang="scss" scoped>
  .main {
    width: 100%;
    background: #fff;
    border-radius: 8px;
    .body {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-bottom: 40px;
      .upload{
        width: 80%;
        border: #dedede 1px solid;
        border-radius: 12px;
        margin: 20px 0;
        .part{
          margin: 10px auto;
          height: 300px;
          display: flex;
          flex-direction: column;
          align-items: center;
          span{
            font-weight: bold;
            color: #f4516c;
          }
          .center {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            text-align: center;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }


  }
</style>
