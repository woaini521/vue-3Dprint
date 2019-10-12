<!--批量上传gcode文件-->
<template>
  <div class="body">
    <div class="fileUpload">
<!--      #99a9bf-->
      <el-divider content-position="left"><span style="color: #f4516c; font-weight: bold">上传模型</span></el-divider>
      <el-row type="flex" style="width: 100%; height: 100%">
        <el-col :span="12">
          <div class="left">
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
          <div class="right">
            <div class="select">
              <span style="width: 80px; font-size: 16px;">*类型:</span>
              <el-select v-model="value" placeholder="请选择" style="width: 100%">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="btn">
              <el-button type="primary" size="medium">上传</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="tip">

      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item name="1">
          <template slot="title">
            <i class="el-icon-warning-outline" style="color: #f4516c">
              <span style="color: #f4516c;font-weight: bold;">&nbsp;注意事项</span>
            </i>
          </template>
          <div style="font-size: 14px">1、上传的文件至少含有一个.gcode文件</div>
          <div style="font-size: 14px">2、gcode对应的图片文件命名必须是是以gcode的命名加下划线"_"加编号（1，2，3）。假设上传的1.gcode那图片文件必须为1_1.jpg类似这样的格式</div>
          <div style="font-size: 14px">3、gcode的文件名将作为gcode的名称</div>
          <div style="font-size: 14px">4、如果没有对应的图片，系统将会默认的图片代替，且图片个数最多为4张，多了不予上传和保存</div>
          <div style="font-size: 14px">5、批量上传的文件的类型选择后，所有gcode为同一个类型</div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <i class="el-icon-warning-outline" style="color: #f4516c">
              <span style="color: #f4516c;font-weight: bold;">&nbsp;上传示例</span>
            </i>
          </template>
          <div class="img">
            <el-image src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg" fit="fill"></el-image>
          </div>
        </el-collapse-item>
      </el-collapse>

    </div>
  </div>

</template>

<script>
    export default {
        name: "GcodesUpload",
        data() {
            return {
                activeNames: ['1']
            };
        },
    }
</script>

<style lang="scss" scoped>
  .body{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    .fileUpload{
      width: 100%;
      height: 350px;
      margin: 20px 0;
      background: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      .left{
        display: flex;
        height: 100%;
        text-align: center;
        align-items: center;
        justify-content: center;
      }
      .right{
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
        .select{
          display: flex;
          width: 300px;
          align-items: center;
        }
        .btn{
          margin-left: 20px;
        }
      }
    }
    .tip{
      width: 100%;
      background: #fff;
      margin: 20px 0;
      .el-collapse{
        padding: 0 20px;
        color: #ef4300;
      }
      .img{
        width: 500px;
        height: auto;
      }
    }
  }


</style>
