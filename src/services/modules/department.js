/**
 * 部门管理相关
 */

export default {
  category: 'department',
  pathList: [
    // 获取部门列表
    {key: 'getDepartmentList', url: 'department/getDepartmentList'},
    // 修改部门内容
    {key: 'modifyDepartment', url: 'department/modifyDepartment'}
  ]
}
