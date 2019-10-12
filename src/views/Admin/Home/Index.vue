<template>
  <div>
<!--  <el-divider content-position="left"><Span style="font-weight: bold">欢迎使用</Span></el-divider>-->
    <div class="body">
      <PanelGroup/>

      <div class="card">
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <el-table
            :data="tableData"
            border
            :show-header="false"
            style="width: 100%;"
            stripe>
            <el-table-column
              prop="key"
              label="说明">
            </el-table-column>
            <el-table-column
              prop="value"
              label="内容">
            </el-table-column>
          </el-table>
        </el-card>
      </div>

    </div>
  </div>
</template>

<script>
    import PanelGroup from "./Components/PanelGroup";
    export default {
        name: "Index",
        components: {PanelGroup},
        data(){
            return{
                headCard:[{
                    imgurl: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
                    content: '新消息'
                },{
                    imgurl: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
                    content: '新增用户'
                },{
                    imgurl: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
                    content: '用户总数'
                },{
                    imgurl: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
                    content: '模型总数'
                }],

                tableData: [{
                    key: '开发人员',
                    value: 'xxxx'
                },{
                    key: 'Vue版本',
                    value: '2.5.2'
                },{
                    key:'SpringBoot版本',
                    value: '2.1.0'
                },{
                    key: '数据库版本',
                    value: 'xxx'
                }]
            };
        }
    }
</script>

<style scoped>
  .body{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .body .card{
    width: 100%;
    display: flex;
    margin: 20px 0;
  }
  .el-card{
    width: 100%;
  }

</style>
