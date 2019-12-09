import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

export default new Router({
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
        {
          path: '/admin/gcodesUpload',
          name: '批量上传',
          component: () => import('../views/Admin/GcodeManage/GcodesUpload'),
          meta: {
            requireAuth: true,
            requireAdminAuth: true
          }
        },
        {
          path: '/admin/gcodePic',
          name: '修改默认封面',
          component: () => import('../views/Admin/GcodeManage/GcodePic'),
          meta: {
            requireAuth: true,
            requireAdminAuth: true
          }
        }
      ]
    },
    {
      path: '/userCenter',
      name: '用户中心',
      component: ()=>import('../views/UI/UserCenter'),
      meta: {
        requireAuth: true
      },
      children:[
        {
          path: '/userCenter/userInfo',
          name: '用户信息',
          component: ()=>import('../views/UI/UserInfo'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/userCenter/updatePwd',
          name: '修改密码',
          component: ()=>import('../views/UI/UpdatePwd'),
          meta: {
            requireAuth: true
          }
        }
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
})
