<template>
  <div class="body">
    <el-row type="flex" style="width: 100%">
      <el-col :span="12">
        <div class="left">
          <el-divider content-position="left"><span style="color: #f4516c; font-weight: bold">上传图片</span></el-divider>
          <div class="main">
            <el-upload
              class="upload-demo"
              action="#"
              list-type="picture-card"
              :auto-upload="false"
              accept=".jpg,.png"
              ref="picList_pre"
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
              <div class="el-upload__tip" slot="tip">*选择一张图片</div>
            </el-upload>

            <div class="btn">
              <el-button type="primary" size="small">上传</el-button>
            </div>

          </div>

          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="right">
          <el-divider content-position="left"><span style="color: #f4516c; font-weight: bold">当前默认封面</span></el-divider>
          <div class="main">
            <el-image src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"></el-image>
            <div style="font-size: 12px;color: #f4516c; font-weight: bold">*当批量上传时对应的图片为空时，使用系统的默认图片</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "GcodePic"
    }
</script>

<style lang="scss" scoped>
  .body{
    width: 95%;
    margin: 0 auto;
    .left{
      margin: 20px 20px 20px 0;
      height: 350px;
      background: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 8px;
      box-shadow: #b8bacc 0px 2px 4px;
      .main{
        text-align: center;
        margin: auto;
        .btn{
          text-align: center;
          margin: 20px auto;
        }
      }
    }
    .right{
      margin: 20px 0 20px 20px;
      height: 350px;
      background: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 8px;
      box-shadow: #b8bacc 0px 2px 4px;
      .main{
        text-align: center;
        margin: auto;
        .el-image{
          margin-bottom: 10px;
          width: 300px;
          height: auto;
        }
      }
    }
  }
</style>
