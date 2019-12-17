import axios from 'axios'
import {Message} from "element-ui";
import store from "../store";
import router from '../router'

const service = axios.create({
  timeout: 15000, // 请求超时时间
  baseURL: '/api/',
  crossDomain: true,
  withCredentials: true,
  headers: {'Content-Type':'application/json; charset=UTF-8'}
});

service.interceptors.request.use(config => {
    let token = $cookies.get('token');
    if (token != null) {
      config.headers['Authorization'] = token;
    }
    return config
  },
  error => {
    Message.error("请求超时！");
    return Promise.reject(res)
  });
// respone拦截器
service.interceptors.response.use(
  response => {
    if(response.headers['authorization'] != null) {
      store.commit("saveToken",response.headers['authorization']);
    }
    if(response.data.code === 400) {
      Message.error(response.data.data);
      return null;
    }
    return response
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400: error.message = '请求错误(400)'; break;
        case 401: error.message = '未授权，请重新登录(401)';
          if (store.state.TOKEN.identity === '0') {
            router.replace('/adminLogin');
          } else if (store.state.TOKEN.identity === '1') {
            router.replace('/index')
          }
          store.commit("clearToken");
          store.commit("clearName");
          store.commit("clearIdentity");
          break;
        case 403: error.message = '拒绝访问(403)'; break;
        case 404: error.message = '请求出错(404)'; break;
        case 408: error.message = '请求超时(408)'; break;
        case 500: error.message = '服务器错误(500)'; break;
        case 501: error.message = '服务未实现(501)'; break;
        case 502: error.message = '网络错误(502)'; break;
        case 503: error.message = '服务不可用(503)'; break;
        case 504: error.message = '网络超时(504)'; break;
        case 505: error.message = 'HTTP版本不受支持(505)'; break;
        default: error.message = `连接出错(${error.response.status})!`;
      }
    } else {
      error.message = '连接服务器失败!'
    }
    Message.error(error.message);
    return Promise.resolve(error)
  }
);

export default service
