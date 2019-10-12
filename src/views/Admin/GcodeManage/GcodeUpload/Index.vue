<!--上传gcode文件-->
<template>
  <div class="body">
    <el-row type="flex" style="width: 100%">
      <el-col :span="12">
        <div class="homePicUpload">
          <el-divider content-position="left"><span style="color: #f4516c; font-weight: bold">上传封面</span></el-divider>
          <!--      <span style="text-align: center;font-weight: bold;margin-right: 20px;color:#99a9bf;">选择图片:</span>-->
          <div class="center">
            <el-upload
              class="upload-demo"
              action="#"
              list-type="picture-card"
              :auto-upload="false"
              accept=".jpg,.png"
              ref="picList_home"
              limit="1">

              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file,fileList}">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url" alt=""
                >
                <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview_home(file)"
            >
              <i class="el-icon-zoom-in"></i>
            </span>
            <span
              class="el-upload-list__item-delete"
              @click="handleRemove_home(file)"
            >
              <i class="el-icon-delete"></i>
            </span>
          </span>
              </div>
              <div class="el-upload__tip" slot="tip">*选择一张图片作为封面(<span style="color: red">必选</span>)</div>
            </el-upload>
          </div>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="prePicUpload">
          <el-divider content-position="left"><span style="color: #f4516c; font-weight: bold">上传预览图</span></el-divider>
          <!--      <span style="text-align: center;font-weight: bold;margin-right: 20px;color:#99a9bf;">选择图片:</span>-->
          <div class="center">
            <el-upload
              class="upload-demo"
              action="#"
              list-type="picture-card"
              :auto-upload="false"
              accept=".jpg,.png"
              ref="picList_pre"
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
              @click="handlePictureCardPreview_pre(file)"
            >
              <i class="el-icon-zoom-in"></i>
            </span>
            <span
              class="el-upload-list__item-delete"
              @click="handleRemove_pre(file)"
            >
              <i class="el-icon-delete"></i>
            </span>
          </span>
              </div>
              <div class="el-upload__tip" slot="tip">*最多添加3张图片</div>
            </el-upload>
          </div>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>
      </el-col>
    </el-row>

    <el-row type="flex" style="width: 100%">
      <el-col :span="24">
        <div class="fileUpload">
          <el-divider content-position="left"><span style="color: #f4516c; font-weight: bold">上传模型</span></el-divider>
          <el-row type="flex"  style="height: 100%; width: 100%;">
            <el-col :span="12">
              <div class="center">
                <el-upload
                  class="upload-demo"
                  ref="gcodeList"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :file-list="gcodeList"
                  :auto-upload="false"
                  limit="1"
                  drag
                  accept=".jpg"
                >
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  <div class="el-upload__tip" slot="tip">*只能上传GCODE文件</div>
                  <!--    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>-->
                  <!--    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
                </el-upload>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="fileUpload_right">
                <div style="display: flex;width: 350px">
                  <span style="width: 120px;font-size: 16px;">*模型名:&emsp;</span>
                  <el-input type="text" autocomplete="off" placeholder="请输入模型名" size="mini"></el-input>
                </div>
                <div style="display: flex;margin-top: 20px; width: 350px">
                  <span style="width: 120px; font-size: 16px;">*类型:&emsp;&emsp;</span>
                  <el-select v-model="value" placeholder="请选择" style="width: 100%">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div style="display: flex;margin-top: 20px; width: 350px">
                  <span style="width: 120px; font-size: 16px">*说明:&emsp;&emsp;</span>
                  <el-input
                    type="textarea"
                    maxlength="80"
                    show-word-limit
                    placeholder="请输入内容"
                    v-model="textarea">
                  </el-input>
                </div>
                <div class="btn">
                  <el-button style="" size="small" type="primary" @click="submitUpload">上传</el-button>
                  <el-button style="margin-left: 40px;" size="small" type="danger" @click="submitUpload">重置</el-button>
                </div>
              </div>
            </el-col>
          </el-row>


        </div>
      </el-col>
    </el-row>

  </div>


</template>

<script>
    export default {
        name: "GcodeUpload",
        data() {
            return {
                gcodeList: [],
                picList: [],

                dialogImageUrl: '',
                dialogVisible: false,
                textarea: '',
                //类型选择
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: ''
            };
        },
        methods: {
            //移除
            handleRemove_home(file) {
                this.$refs.picList_home.handleRemove(file);
            },
            //预览图片
            handlePictureCardPreview_home(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            //移除
            handleRemove_pre(file) {
                this.$refs.picList_pre.handleRemove(file);
            },
            //预览图片
            handlePictureCardPreview_pre(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
        }
    }
</script>

<style lang="scss" scoped>
  .body {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .fileUpload {
      height: 360px;
      margin: 20px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #fff;
    }
    .homePicUpload {
      height: 350px;
      margin: 20px 20px 20px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #fff;
    }
    .prePicUpload {
      height: 350px;
      margin: 20px 0 20px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #fff;
    }
  }
  .upload-demo {
    align-items: center;
    text-align: center;
  }
  .center {
    height: 100%;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
  }

  .fileUpload_right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    /*width: 50%;*/
    /*margin-left: 25%;*/
    height: 100%;
  }
  .btn{
    display: flex;
    padding: 20px 0 20px 40px;
    justify-content: center;
  }
</style>
