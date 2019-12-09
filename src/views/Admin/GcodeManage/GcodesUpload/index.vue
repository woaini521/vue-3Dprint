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
              action=""
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
              <span style="width: 80px">*类型:</span>
              <el-select v-model="value_type" placeholder="请选择" style="width: 100%" size="small">
                <el-option
                  v-for="item in options_type"
                  :key="item.typeId"
                  :label="item.typeName"
                  :value="item.typeId">
                </el-option>
              </el-select>
            </div>

            <div class="select">
              <span style="width: 80px">*状态:</span>
              <el-select v-model="value_status" placeholder="请选择" style="width: 100%" size="small">
                <el-option
                  v-for="item in options_status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>

            <div class="btn">
              <el-button style="" size="small" type="primary" @click="submitUpload">上传</el-button>
              <el-button style="margin-left: 40px;" size="small" type="danger" @click="submitUpload">重置</el-button>
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
                activeNames: ['1'],

                //类型选择
                options_type: [],
                //状态
                options_status: [{
                    value: '选项1',
                    label: '私密'
                }, {
                    value: '选项2',
                    label: '公开'
                }],
                value_type: '',
                value_status: '',
            };
        },
        mounted(){
            this.getSelectItems();
        },
        methods:{
            getSelectItems(){
                let that = this;
                that.$axios.get(that.$api.gcodeType.getItems)
                    .then(res => {
                        setTimeout(function () {
                            if(res.code === 200){
                                that.options_type = res.data
                            }
                        },500);
                    }).catch(res => {

                })
            },
        }
    }
</script>

<style lang="scss" scoped>
  .body{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    .fileUpload{
      width: 95%;
      height: 350px;
      margin: 20px auto;
      background: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 8px;
      /*border: #dedede 1px solid;*/
      box-shadow: #b8bacc 0px 2px 4px;
      .left{
        display: flex;
        height: 100%;
        text-align: center;
        align-items: center;
        justify-content: center;
      }
      .right{
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: center;
        align-items: center;
        .select{
          display: flex;
          width: 300px;
          align-items: center;
          font-size: 14px;
          font-weight: bold;
          margin: 10px;
          color: #050827;
        }
        .btn{
          margin: 20px 0 20px 40px;
        }
      }
    }
    .tip{
      width: 95%;
      background: #fff;
      margin: 20px auto;
      border-radius: 8px;
      /*border: #dedede 1px solid;*/
      box-shadow: #b8bacc 0px 2px 4px;
      .el-collapse{
        border-radius: 8px;
        padding: 0 20px;
        color: #ef4300;
      }
      .img{
        width: 400px;
        height: auto;
      }
    }
  }


</style>
