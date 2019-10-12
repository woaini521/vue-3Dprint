<template>
  <div class="tabs">
    <el-tabs v-model="activeIndex" type="border-card" closable v-if="openTab.length" @tab-click='tabClick' @tab-remove="tabRemove">
      <el-tab-pane
        :key="item.name"
        v-for="(item, index) in openTab"
        :label="item.name"
        :name="item.route"
      >
      </el-tab-pane>
      <div class="scroll_view">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </el-tabs>
  </div>
</template>

<script>
    export default {
        name: "Main",
        data(){
            return{

            };
        },

        computed: {
          activeIndex:{
              get(){
                  return this.$store.state.activeIndex;

              },
              set (val) {
                  this.$store.commit('setActiveTab', val);
              }
          },
          // activeIndex(){
          //     return this.$store.state.activeIndex;
          // },
          openTab(){
              return this.$store.state.openTab;
          }
        },

        methods:{
            //tab标签点击时，切换相应的路由
            tabClick(tab){
                console.log('active',this.activeIndex);
                this.$router.push({path: this.activeIndex});
            },
            //移除tab标签
            tabRemove(targetName){
                //首页不删
                if(targetName === '/admin/index'){
                    return
                }
                this.$store.commit('deleteTab', targetName);
                if (this.activeIndex === targetName) {
                    // 设置当前激活的路由
                    if (this.openTab && this.openTab.length >= 1) {
                        this.$store.commit('setActiveTab', this.openTab[this.openTab.length-1].route);
                        this.$router.push({path: this.activeIndex});
                    } else {
                        this.$router.push({path: '/admin/index'});
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
  .tabs {
    display: flex;
    width: 100%;
    height: 100%;
  }
  .el-tabs {
    background: #f5f5f5 !important;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: auto;
    .scroll_view{
      width: 100%;
      height: 100%;
    }
  }
</style>
