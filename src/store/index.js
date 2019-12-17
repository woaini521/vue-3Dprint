import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'vue-cookies'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    //登录状态管理
    TOKEN:{
      name: Cookie.get("name"),
      nickName: Cookie.get("nickName"),
      token: Cookie.get("token"),
      identity: Cookie.get("identity")
    },
    //加载
    loading:{
      status: false,
      text: ''
    },
    //tabs标签管理
    openTab:[],//所有打开的路由
    activeIndex: '/admin/index', //激活的页面路由
    httpUrl: 'http://localhost:8081',
  },
  mutations:{
    saveName(state,name){
      state.TOKEN.name = name;
      Cookie.set("name",name);
    },
    saveNickName(state,nickName){
      state.TOKEN.nickName = nickName;
      Cookie.set("nickName",nickName);
    },
    saveToken(state,token){
      state.TOKEN.token = token;
      Cookie.set("token",token);
    },
    saveIdentity(state,identity){
      state.TOKEN.identity = identity;
      Cookie.set("identity",identity);
    },
    clearName(state){
      state.TOKEN.name = null;
      Cookie.remove("name");
    },
    clearNickName(state){
      state.TOKEN.nickName = null;
      Cookie.remove("nickName");
    },
    clearToken(state){
      state.TOKEN.token = null;
      Cookie.remove("token");
    },
    clearIdentity(state){
      state.TOKEN.identity = null;
      Cookie.remove("identity");
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
