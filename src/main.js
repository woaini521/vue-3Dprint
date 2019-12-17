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
import {Message, MessageBox} from "element-ui";

Vue.config.productionTip = false;

//把axios 作为Vue的原型属性
Vue.prototype.$axios = axios;
Vue.prototype.$api = api;
Vue.prototype.$aes = aes;

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
