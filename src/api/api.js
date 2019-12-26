export default {
  /**
   * 统一封装API接口
   */

  login: '/login',
  register: '/register',
  //用户管理
  userInfo:{
    getOne: '/userInfo/getOne',
    getList: '/userInfo/getUserList',
    resetPassword: '/userInfo/resetPassword',
    updatePwd: '/userInfo/updatePwd',
    update: '/userInfo/update',
    delete: '/userInfo/delete',
    deleteMul: '/userInfo/deleteMul'
  },
  //模型管理
  gcodeInfo:{
    getAllGcode: '/gcodeInfo/getAllGcode',
    getOne: '/gcodeInfo/getOne',
    upload: '/gcodeInfo/upload',
    update: '/gcodeInfo/update',
    delete: '/gcodeInfo/delete',
    deleteMul: '/gcodeInfo/deleteMul'
  },
  //模型类型
  gcodeType:{
    getAllType: '/gcodeType/getAllType',
    addType: '/gcodeType/addType',
    deleteType: '/gcodeType/deleteType',
    deleteTypeMul: '/gcodeType/deleteTypeMul',
    updateType: '/gcodeType/updateType',
    getItems: '/gcodeType/getList'
  },
  gcodeStatus:{
    getItems: '/gcodeStatus/getList'
  }
}
