/**
 * search
 */
import Layout from '@/components/layout'

export default {
  path: '',
  name: 'layout',
  component: Layout,
  children: [
    {
      path: '/classpage/:id',
      name: 'classpage',
      meta: {
        pathName: '长城华冠'
      },
      component: () => import('@/routes/page/classpage')
    },
    {
      path: '/map',
      name: 'map',
      meta: {
        pathName: '长城华冠'
      },
      component: () => import('@/routes/page/map')
    },
    {
      path: '/examine',
      name: 'examine',
      meta: {
        pathName: '长城华冠'
      },
      component: () => import('@/routes/page/examine')
    },
    {
      path: '/morepage/:id',
      name: 'morepage',
      meta: {
        pathName: '长城华冠'
      },
      component: () => import('@/routes/page/morepage')
    },
    {
      path: '/morepage2/:id',
      name: 'morepage2',
      meta: {
        pathName: '长城华冠'
      },
      component: () => import('@/routes/page/morepage2')
    },
    {
      path: '/morepageInfo1/:id',
      name: 'morepageInfo1',
      meta: {
        pathName: '长城华冠'
      },
      component: () => import('@/routes/page/morepageInfo1')
    },
    {
      path: '/morepageInfo2/:id',
      name: 'morepageInfo2',
      meta: {
        pathName: '长城华冠'
      },
      component: () => import('@/routes/page/morepageInfo2')
    },
    {
      path: '/details/:id',
      name: 'details',
      meta: {
        pathName: '长城华冠'
      },
      component: () => import('@/routes/page/details')
    }
  ]
}
