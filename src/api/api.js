export default {
  /**
   * 统一封装API接口
   */

  //用户
  userInfo:{
    login: '/login',
    register: 'userInfo/register',
    getList: 'userInfo/getUserList'
  },
  //管理员
  adminInfo:{
    login: '/login',
  },
  //模型管理
  gcodeInfo:{
    getAllGcode: 'gcodeInfo/getAllGcode',
    getGcodeInfo: 'gcodeInfo/getGcodeInfo',
    upload: 'gcodeInfo/upload',
  },
  //模型类型
  gcodeType:{
    getAllType: 'gcodeType/getAllType',
    addType: 'gcodeType/addType',
    deleteType: 'gcodeType/deleteType',
    deleteTypeMul: 'gcodeType/deleteTypeMul',
    updateType: 'gcodeType/updateType',
    getItems: 'gcodeType/getItems'
  }
}
