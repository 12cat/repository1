/**
 * home
 */
import Layout from '@/components/layout'

export default {
  path: '',
  name: 'layout',
  component: Layout,
  children: [
    {
      path: '/',
      name: 'home',
      meta: {
        pathName: '长城华冠'
      },
      component: () => import('@/routes/home')
    },
    {
      path: 'upload',
      name: 'upload',
      meta: {
        pathName: '长城华冠'
      },
      component: () => import('@/routes/home/upload')
    },
    {
      path: 'edit/:id',
      name: 'edit',
      meta: {
        pathName: '长城华冠'
      },
      component: () => import('@/routes/home/upload')
    },
    {
      path: 'user/:type',
      name: 'user',
      meta: {
        pathName: '长城华冠'
      },
      component: () => import('@/routes/home/user')
    }
  ]
}
