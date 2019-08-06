/**
 * 用户相关
 */

export default {
  category: 'user',
  pathList: [
    // 用户登录
    {key: 'login', url: 'user/login'},
    // 用户登出
    {key: 'logout', url: 'user/logout'},
    // 修改密级配置
    {key: 'modifySecrecy', url: 'user/modifySecrecy'},
    // 获取密级列表
    {key: 'getSecrecyList', url: 'user/getSecrecyList'},
    // 查看用户信息
    {key: 'getUserInfo', url: 'user/getUserInfo'},
    // 获取账号列表
    {key: 'getAccountList', url: 'user/getAccountList'},
    // 修改账号
    {key: 'modifyAccount', url: 'user/modifyAccount'},
    // 获取账号修改日志
    {key: 'getOperatorLog', url: 'user/getOperatorLog'},
    // 获取权限列表
    {key: 'getAuthorityList', url: 'user/getAuthorityList'},
    // 权限平移
    {key: 'transferAuthority', url: 'user/transferAuthority'}
  ]
}
