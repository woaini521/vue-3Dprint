<template>
  <div class="TopNavMenu">
    <div class="main">
      <div class="TopNavMenu_main_text" :class="{'active-class':current === 4}" @click="handleClick(null,4)">全部</div>
      <div v-for="(item,index) in items" :key="index" class="TopNavMenu_main_text" :class="{'active-class':current === index}" @click="handleClick(item.typeId,index)">{{item.typeName}}</div>
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
                items: [],
                current: 4
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
                        if(res){
                            that.items = res.data.data
                        }
                    }).catch(res => {

                })
            },
            handleClick(typeId,index){
                this.current = index;
                this.$emit("changeId",typeId);
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
      }
      .active-class{
        color: #36a3f7;
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
