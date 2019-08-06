/**
 * 文档相关
 */

export default {
  category: 'document',
  pathList: [
    // 上传文件
    {key: 'uploadFile', url: 'document/uploadFile'},
    // 上传文档
    {key: 'uploadDocument', url: 'document/uploadDocument'},
    // 文档下载
    {key: 'downloadDocument', url: 'document/downloadDocument'},
    // 文档搜索
    {key: 'searchDocument', url: 'document/searchDocument'},
    // 获取文档列表
    {key: 'getDocumentListByType', url: 'document/getDocumentListByType'},
    // 根据类目id和搜索内容，获取文档列表
    {key: 'getDocumentListByCategory', url: 'document/getDocumentListByCategory'},
    // 部门文档
    {key: 'getDocumentListByDepartment', url: 'document/getDocumentListByDepartment'},
    // 获取个人中心数据
    {key: 'getUserDocumentListByType', url: 'document/getUserDocumentListByType'},
    // 修改文档
    {key: 'modifyDocument', url: 'document/modifyDocument'},
    // 获取历史文档
    {key: 'getHistoryDocument', url: 'document/getHistoryDocument'},
    // 文档详情
    {key: 'getDocumentById', url: 'document/getDocumentById'}
  ]
}
