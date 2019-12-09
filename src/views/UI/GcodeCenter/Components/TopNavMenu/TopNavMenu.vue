<template>
  <div class="TopNavMenu">
    <div class="main">
      <div v-for="item in items" :key="item">
        <div class="TopNavMenu_main_text">{{item.typeName}}</div>
      </div>
    </div>
    <div class="TopNavMenu_search">
      <div>
        <el-input
          size="medium"
          placeholder="搜索模型"
          prefix-icon="el-icon-search"
          >
        </el-input>
      </div>

      <div class="TopNavMenu_search_button">
<!--        <el-button type="info" icon="el-icon-search" circle  style="background: #292421;border-color: #292421;"></el-button>-->
        <el-button type="info" icon="el-icon-search" circle style="height: 100%; width: 100%"></el-button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "TopNavMenu",
        data(){
            return{
                items: ['日用品','玩具','艺术品','动漫周边']
            };
        },
        created(){
            this.getAllType();
        },
        methods: {
            /**
             * 获取所有类型
             */
            getAllType() {
                let that = this;
                that.$axios.get(that.$api.gcodeType.getItems)
                    .then(res => {
                        console.log(res)
                        if(res.code === 200){
                            that.items = res.data
                        }
                    }).catch(res => {

                })
            }
        }
    }
</script>

<style lang="scss" scoped>
  .TopNavMenu{
    z-index: 999;
    width: 100%;
    display: flex;
    position: fixed;
    height: 60px;
    background: #fff;
    box-shadow: #b8bacc 0 2px 4px;
    .main{
      margin-left: 20%;
      margin-right: auto;
      display: flex;
      align-items: center;
      text-align: center;
      .TopNavMenu_main_text{
        padding: 0 20px;
        width: 60px;
        font-size: 15px;
        font-weight: bold;
        color: #111;
        cursor: pointer;
        &:hover{
          /*color: white;*/
          cursor: pointer;
        }
      }

    }
    .TopNavMenu_search{
      height: 100%;
      margin-right: 20%;
      margin-left: auto;
      display: flex;
      align-items: center;
      .TopNavMenu_search_button{
        margin-left: 10px;
      }
    }
  }

</style>
