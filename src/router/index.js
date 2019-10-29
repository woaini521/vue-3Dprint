import Vue from 'vue'
import Router from 'vue-router'
import AdminIndex from '../views/Admin/Layout/Index';
import UserIndex from '../views/User/Layout/Index';
import Home from '../views/Admin/Home/Index';
import Login from "../views/Admin/Login/Index";
import UserInfo from "../views/Admin/UserManage/UserInfo/Index";
import GcodeType from "../views/Admin/GcodeManage/GcodeType/Index";
import GcodesUpload from "../views/Admin/GcodeManage/GcodesUpload/Index";
import GcodeManagement from "../views/Admin/GcodeManage/GcodeManage/Index";
import GcodeUpload from "../views/Admin/GcodeManage/GcodeUpload/Index";
import GcodePic from '../views/Admin/GcodeManage/GcodePic/index';

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
      component: UserIndex,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/adminLogin',
      name: '管理员登录',
      component: Login,
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
      component: AdminIndex,
      meta: {
        requireAuth: true,
        requireAdminAuth: true
      },
      children: [
        {
          path: '/admin/index',
          name: '后台首页',
          component: Home,
          meta: {
            requireAuth: true,
            requireAdminAuth: true
          }
        },
        {
          path: '/admin/userInfo',
          name: '用户信息',
          component: UserInfo,
          meta: {
            requireAuth: true,
            requireAdminAuth: true
          }
        },
        {
          path: '/admin/gcodeType',
          name: '添加类型',
          component: GcodeType,
          meta: {
            requireAuth: true,
            requireAdminAuth: true
          }
        },
        {
          path: '/admin/gcodeManage',
          name: '产品管理',
          component: GcodeManagement,
          meta: {
            requireAuth: true,
            requireAdminAuth: true
          }
        },
        {
          path: '/admin/gcodeUpload',
          name: '上传文件',
          component: GcodeUpload,
          meta: {
            requireAuth: true,
            requireAdminAuth: true
          }
        },
        {
          path: '/admin/gcodesUpload',
          name: '批量上传',
          component: GcodesUpload,
          meta: {
            requireAuth: true,
            requireAdminAuth: true
          }
        },
        {
          path: '/admin/gcodePic',
          name: '修改默认封面',
          component: GcodePic,
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
      component: ()=>import('../views/User/UserCenter/Index'),
      meta: {
        requireAuth: true
      },
      children:[
        {
          path: '/userCenter/userInfo',
          name: '用户信息',
          component: ()=>import('../views/User/UserInfo/Index'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/userCenter/updatePwd',
          name: '修改密码',
          component: ()=>import('../views/User/UpdatePwd/Index'),
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/gcodeCenter',
      name: '资源模型',
      component: ()=>import('../views/User/GcodeCenter/Index'),
      meta: {
        requireAuth: false
      }
    }
  ]
})
