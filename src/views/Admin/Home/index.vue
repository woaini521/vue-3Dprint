<template>

<!--  <el-divider content-position="left"><Span style="font-weight: bold">欢迎使用</Span></el-divider>-->
    <div class="body">
      <PanelGroup/>

      <el-table
        :data="tableData"
        :show-header="false"
        class="card"
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

    </div>

</template>

<script>
    import PanelGroup from "./Components/PanelGroup";
    export default {
        name: "Index",
        components: {PanelGroup},
        data(){
            return{

                tableData: [
                    {
                        key: 'Vue',
                        value: '2.5.2'
                    },
                    {
                        key: 'SpringBoot',
                        value: '2.1.0'
                    },
                    {
                        key: 'MySQL',
                        value: '5.7.26'
                    },
                    {
                        key: 'Nginx',
                        value: '1.16.0'
                    },
                    {
                        key: 'Redis',
                        value: '5.0.5'
                    },
                    {
                        key: '运行系统',
                        value: 'CentOS Linux 7.5.1804 (Core)'
                    }
                    ]
            };
        }
    }
</script>

<style lang="scss" scoped>
  .body{
    width: 95%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    .card{
      width: 100%;
      display: flex;
      margin: 20px 0;
      border-radius: 8px;
      box-shadow: #b8bacc 0px 2px 4px;
      /*border-color: rgba(0, 0, 0, .05);*/
    }
  }

</style>
