import Vue from 'vue'
import Router from 'vue-router'
import store from "../store";
import {Message} from "element-ui";

Vue.use(Router);

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/index',
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/index',
      name: '用户首页',
      component: () => import('../views/UI/Layout'),
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/adminLogin',
      name: '管理员登录',
      component: () => import('../views/Admin/Login'),
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/admin',
      redirect: '/admin/index',
      meta: {
        requireAuth: true,
        requireAdminAuth: true
      }
    },
    {
      path: '/admin',
      component: () => import('../views/Admin/Layout'),
      meta: {
        requireAuth: true,
        requireAdminAuth: true
      },
      children: [
        {
          path: '/admin/index',
          name: '后台首页',
          component: () => import('../views/Admin/Home'),
          meta: {
            requireAuth: true,
            requireAdminAuth: true
          }
        },
        {
          path: '/admin/userInfo',
          name: '用户信息',
          component: () => import('../views/Admin/UserManage/UserInfo'),
          meta: {
            requireAuth: true,
            requireAdminAuth: true
          }
        },
        {
          path: '/admin/gcodeType',
          name: '添加类型',
          component: () => import('../views/Admin/GcodeManage/GcodeType'),
          meta: {
            requireAuth: true,
            requireAdminAuth: true
          }
        },
        {
          path: '/admin/gcodeManage',
          name: '产品管理',
          component: () => import('../views/Admin/GcodeManage/GcodeManage'),
          meta: {
            requireAuth: true,
            requireAdminAuth: true
          }
        },
        {
          path: '/admin/gcodeUpload',
          name: '上传文件',
          component: () => import('../views/Admin/GcodeManage/GcodeUpload'),
          meta: {
            requireAuth: true,
            requireAdminAuth: true
          }
        },
        // {
        //   path: '/admin/gcodesUpload',
        //   name: '批量上传',
        //   component: () => import('../views/Admin/GcodeManage/GcodesUpload'),
        //   meta: {
        //     requireAuth: true,
        //     requireAdminAuth: true
        //   }
        // },
        {
          path: '/admin/gcodePic',
          name: '修改默认封面',
          component: () => import('../views/Admin/GcodeManage/GcodePic'),
          meta: {
            requireAuth: true,
            requireAdminAuth: true
          }
        },
        {
          path: '/admin/updatePwd',
          name: '修改密码',
          component: () => import('../views/Admin/SysManage/UpdatePwd'),
          meta: {
            requireAuth: true,
            requireAdminAuth: true
          }
        },
        {
          path: '/admin/updateInfo',
          name: '修改资料',
          component: () => import('../views/Admin/SysManage/UpdateInfo'),
          meta: {
            requireAuth: true,
            requireAdminAuth: true
          }
        },
      ]
    },
    {
      path: '/userCenter',
      name: '用户中心',
      component: ()=>import('../views/UI/UserCenter/Layout/index'),
      meta: {
        requireAuth: true
      },
      children:[
        {
          path: '/userCenter/userInfo',
          name: '用户信息',
          component: ()=>import('../views/UI/UserCenter/UserInfo'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/userCenter/updatePwd',
          name: '修改密码',
          component: ()=>import('../views/UI/UserCenter/UpdatePwd'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/userCenter/gcodeUpload',
          name: '我的上传',
          component: ()=>import('../views/UI/UserCenter/GcodeUpload'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/userCenter/gcodeManage',
          name: '我的下载',
          component: ()=>import('../views/UI/UserCenter/GcodeManage'),
          meta: {
            requireAuth: true
          }
        },
      ]
    },
    {
      path: '/gcodeCenter',
      name: '资源模型',
      component: ()=>import('../views/UI/GcodeCenter')
    },
    {
      path: '/404',
      name: '404',
      component: ()=>import('../views/404.vue')
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
});

//路由拦截器
router.beforeEach((to,from,next) => {
  if(to.meta.requireAdminAuth){
    //需要管理员认证
    if(store.state.TOKEN.token && store.state.TOKEN.identity === "0"){
      next()
    }else{
      Message.error("请先登录再访问...");
      setTimeout(function () {
        next({
          name: '管理员登录',
          query: {redirect: to.fullPath}
        })
      },1000);
    }
  }else if(to.meta.requireAuth){
    //需要认证
    if(store.state.TOKEN.token && store.state.TOKEN.identity === "1"){
      next()
    }else{
      Message.error("请先登录再访问...");
      setTimeout(function () {
        next({
          name: '用户首页',
          query: {redirect: to.fullPath}
        },1000);
      })
    }
  }else{
    next()
  }
});

export default router
