import axios from 'axios'
import {Message} from "element-ui";

// axios.defaults.baseURL = '/api'; // 配置axios请求的地址
// axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
// axios.defaults.crossDomain = true;
// axios.defaults.withCredentials = true;  //设置cross跨域 并设置访问权限 允许跨域携带cookie信息
// axios.defaults.headers.common['Authorization'] = ''; // 设置请求头为 Authorization
// export default axios

// 创建axios实例
const service = axios.create({
  // api的base_url，本地配置的代理，理论上可以不用baseURL
  timeout: 15000, // 请求超时时间
  baseURL: '/api',
  crossDomain: true,
  withCredentials: true,
  headers: {'Content-Type':'application/json; charset=UTF-8'}
});

// request拦截器
service.interceptors.request.use(config => {

    // !!! 这里开始触发 loading 效果 !!!
    // store.dispatch('startLoading', true)
    //
    // // 设置 token header
    // getToken() && (config.headers['token'] = token)
    //
    // // 这个是微信登录中需要用到 header
    // config.headers['deviceType'] = 'school_admin_web'
    return config
  },
  error => {
    const { response } = error;
    // 这里可以根据自己的业务做一些操作，比如说全局提示

    Promise.reject(error)
  });

// respone拦截器
service.interceptors.response.use(
  response => {
    // !!! 关闭 loading !!!
    // store.dispatch('startLoading', false)

    const res = response.data;
    if(res.code === 200){
      Message.success(res.data);
    }else{
      Message.error(res.data)
    }

    return response.data
  },
  error => {
    // !!! 关闭 loading !!!
    // store.dispatch('SetLoading', false)

    const { response } = error
    // 这里可以根据自己的业务做一些操作，比如说强制登出

    return Promise.reject(error)
  }
);

export default service
