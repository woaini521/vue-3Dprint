export default {
  new: function () {
    return{
      'typeId':{
        'type': 'string',
        'label': '类型ID',
        'queryable': false,
        'defaultValue': '',
        'width': '250px',
        'visible': false
      },
      'typeName':{
        'type': 'string',
        'label': '类型名称',
        'queryable': true,
        'defaultValue': '',
        'width': '250px',
        'visible': true
      },
      'createDate':{
        'type': 'date',
        'label': '创建日期',
        'queryable': false,
        'defaultValue': '',
        'width': '250px',
        'visible': true
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
