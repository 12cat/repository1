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
      path: '/search',
      name: 'search',
      meta: {
        pathName: '长城华冠'
      },
      component: () => import('@/routes/search')
    },
    {
      path: '/othersearch',
      name: 'othersearch',
      meta: {
        pathName: '长城华冠'
      },
      component: () => import('@/routes/search/othersearch')
    }
  ]
}
