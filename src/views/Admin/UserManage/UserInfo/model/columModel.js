import fa from "element-ui/src/locale/lang/fa";

export default {
  new: function () {
    return{
      'userId':{
        'type': 'string',
        'label': 'ID',
        'queryable': false,
        'defaultValue': '',
        'width': '250px',
        'visible': false
      },
      'userName':{
        'type': 'string',
        'label': '账号',
        'queryable': true,
        'defaultValue': '',
        'width': '250px',
        'visible': true
      },
      'nickName':{
        'type': 'string',
        'label': '昵称',
        'queryable': true,
        'defaultValue': '',
        'width': '250px',
        'visible': true
      },
      'space':{
        'type': 'string',
        'label': '空间容量',
        'queryable': false,
        'defaultValue': '',
        'width': '250px',
        'visible': true
      },
      'spaceUsed':{
        'type': 'string',
        'label': '已用空间',
        'queryable': false,
        'defaultValue': '',
        'width': '250px',
        'visible': true
      },
      'createDate':{
        'type': 'date',
        'label': '注册日期',
        'queryable': false,
        'defaultValue': '',
        'width': '250px',
        'visible': true
      },
      'roleId':{
        'type': 'string',
        'label': '角色ID',
        'queryable': false,
        'defaultValue': '1',
        'width': '250px',
        'visible': false
      },
      'operate': {
        'type': 'string',
        'label': '操作',
        'width': '250px',
        'visible': true
      }
    }
  }
}
