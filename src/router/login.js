/**
 * login
 */

export default {
  path: '/login',
  name: 'login',
  meta: {
    pathName: '长城华冠'
  },
  component: () => import('@/routes/home/login')
}
