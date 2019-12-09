export default {
  new: function () {
    return{
      'gcodeId':{
        'type': 'string',
        'label': '模型ID',
        'queryable': false,
        'defaultValue': '',
        'width': 'auto',
        'visible': true
      },
      'gcodeName':{
        'type': 'string',
        'label': '模型名称',
        'queryable': true,
        'defaultValue': '',
        'width': 'auto',
        'visible': true
      },
      'homePic':{
        'type': 'string',
        'label': '缩略图',
        'queryable': false,
        'defaultValue': '',
        'width': 'auto',
        'visible': true
      },
      'username':{
        'type': 'string',
        'label': '上传用户',
        'queryable': true,
        'defaultValue': '',
        'width': 'auto',
        'visible': true
      },
      'typeName':{
        'type': 'string',
        'label': '类型名称',
        'queryable': true,
        'defaultValue': '',
        'width': 'auto',
        'visible': true
      },
      'createDate':{
        'type': 'date',
        'label': '创建日期',
        'queryable': false,
        'defaultValue': '',
        'width': '150px',
        'visible': true
      },
      'popular':{
        'type': 'string',
        'label': '人气',
        'queryable': false,
        'defaultValue': '',
        'width': 'auto',
        'visible': true
      },
      'size':{
        'type': 'string',
        'label': '文件大小(B)',
        'queryable': false,
        'defaultValue': '',
        'width': 'auto',
        'visible': true
      },
      'intro':{
        'type': 'string',
        'label': '简介',
        'queryable': false,
        'defaultValue': '',
        'width': 'auto',
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
