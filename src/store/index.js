import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'vue-cookies'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    //登录状态管理
    TOKEN:{
      userName: Cookie.get("userName"),
      userToken: Cookie.get("userToken"),
      adminName: Cookie.get("adminName"),
      adminToken: Cookie.get("adminToken")
    },
    //加载
    loading:{
      status: false,
      text: ''
    },
    //tabs标签管理
    openTab:[],//所有打开的路由
    activeIndex: '/admin/index', //激活的页面路由
    imgUrl: 'http://localhost:8081',
  },
  mutations:{
    saveUserToken(state,userToken){
      state.TOKEN.userName = userToken.userName;
      state.TOKEN.userToken = userToken.userToken;
      Cookie.set("userName",userToken.userName);
      Cookie.set("userToken",userToken.userToken);
    },
    clearUserToken(state){
      state.TOKEN.userName = null;
      state.TOKEN.userToken = null;
      Cookie.remove("userName");
      Cookie.remove("userToken");
    },
    saveAdminToken(state,userToken){
      state.TOKEN.adminName = userToken.adminName;
      state.TOKEN.adminToken = userToken.adminToken;
      Cookie.set("adminName",userToken.adminName);
      Cookie.set("adminToken",userToken.adminToken);
    },
    clearAdminToken(state){
      state.TOKEN.adminName = null;
      state.TOKEN.adminToken = null;
      Cookie.remove("adminName");
      Cookie.remove("adminToken");
    },
    //添加tab页
    addTab(state,data){
      state.openTab.push(data);
    },
    //删除tab
    deleteTab(state,route){
      let index = 0;
      for(let option of state.openTab){
        if(option.route === route){
          break;
        }
        index++;
      }
      state.openTab.splice(index,1);
    },
    //设置当前激活的tab
    setActiveTab(state,index){
      state.activeIndex = index;
    },
    //初始化tab
    clearTab(state){
      state.openTab = [];
      state.activeIndex = '/admin/index';
    }
  },
  actions:{
    startLoading({state, commit},status){
      commit('updateLoadingStatus', status)
    },
  }
})
