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
      <div class="scroll_view" id="scroll_view">

        <transition :name="direction">
          <keep-alive>
            <router-view v-if="isRouterAlive"></router-view>
          </keep-alive>
        </transition>

      </div>
    </el-tabs>
  </div>
</template>

<script>
    export default {
        name: "Main",
        data(){
            return{
                direction: "drop-down",
                isRouterAlive:true
            };
        },
        provide() {
            return {
                reload: this.reload
            }
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
            },
            //路由刷新
            reload(){
                this.isRouterAlive = false;
                this.$nextTick(function(){
                    this.isRouterAlive = true;
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
  .tabs {

    width: 100%;
    height: 100%;
    .el-tabs {
      background: #f2f2f2;
      /*background-image: linear-gradient(to bottom right,#f5f5f5,#dedede,#050827);*/
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      overflow: scroll;
      .scroll_view{
        width: calc(100% - 5px);
        height: calc(100% - 5px);
        margin: auto;
        overflow: scroll;
      }
    }
  }

  .drop-down-enter-active,
  /*.drop-down-leave-active,*/
  .pull-up-enter-active,
  .pull-up-leave-active {
    will-change: transform;
    transition: all .5s;
    /*position: absolute;*/
  }
  .drop-down-enter {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }
  .drop-down-leave-active {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  .pull-up-enter {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }
  .pull-up-leave-active{
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
</style>
