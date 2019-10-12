import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'vue-cookies'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    //登录状态管理
    user:{
      userName: Cookie.get("userName"),
      userToken: Cookie.get("userToken"),
    },
    admin:{
      adminName: Cookie.get("adminName"),
      adminToken: Cookie.get("adminToken"),
    },
    //加载
    loading:{
      status: false,
      text: ''
    },
    //tabs标签管理
    openTab:[],//所有打开的路由
    activeIndex: '/admin/index', //激活的页面路由
  },
  mutations:{
    saveUserToken(state,userToken){
      state.user.userName = userToken.userName;
      state.user.userToken = userToken.userToken;
      Cookie.set("userName",userToken.userName,{expires: 7});
      Cookie.set("userToken",userToken.userToken,{expires: 7});
    },
    saveAdminToken(state,adminToken){
      state.admin.adminName = adminToken.adminName;
      state.admin.adminToken = adminToken.adminToken;
      Cookie.set("adminName",adminToken.adminName,{expires: 7});
      Cookie.set("adminToken",adminToken.adminToken,{expires: 7});
    },
    clearUserToken(state){
      state.user.userName = null;
      state.user.userToken = null;
      Cookie.remove("userName");
      Cookie.remove("userToken");
    },
    clearAdminToken(state){
      state.admin.adminName = null;
      state.admin.adminToken = null;
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
