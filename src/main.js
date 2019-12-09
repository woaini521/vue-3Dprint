// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from  './store'
import '@/icons'
import './elementUI'
import axios from './api/http'
import api from './api/api'
import aes from './utils/aes'

Vue.config.productionTip = false;

//把axios 作为Vue的原型属性
Vue.prototype.$axios = axios;
Vue.prototype.$api = api;
Vue.prototype.$aes = aes;

//路由拦截器
router.beforeEach((to,from,next) => {
  if(to.meta.requireAdminAuth){
    //需要管理员认证
    if(store.state.TOKEN.adminToken){
      next()
    }else{
      next({
        name: '管理员登录',
        query: {redirect: to.fullPath}
      })
    }
  }else if(to.meta.requireAuth){
    //需要认证
    if(store.state.TOKEN.userToken){
      next()
    }else{
      next({
        name: '用户首页',
        query: {redirect: to.fullPath}
      })
    }
  }else{
    next()
  }
});

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
