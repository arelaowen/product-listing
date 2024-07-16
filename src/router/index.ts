import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    meta: {
        searchEnabled: true
    },
    components: {
      default: () => import('@/views/Dashboard.vue'),
      Navbar: () =>  import('@/components/Navbar.vue')
    }
  },
  {
    path: '/product/detail/:id',
    meta: {
        searchEnabled: false
    },
    components: {
      default: () => import('@/views/ProductView.vue'),
      Navbar: () =>  import('@/components/Navbar.vue')
    }
  },
  {
    path: '/maintenance/product',
    meta: {
        searchEnabled: false
    },
    components: {
      default: () => import('@/views/Maintenance/Product.vue'),
      Navbar: () =>  import('@/components/Navbar.vue')
    }
  },
  {
    path: '/maintenance/user',
    meta: {
        searchEnabled: false
    },
    components: {
      default: () => import('@/views/Maintenance/User.vue'),
      Navbar: () =>  import('@/components/Navbar.vue')
    }
  },
  {
    path: '/cart',
    meta: {
        searchEnabled: false
    },
    components: {
      default: () => import('@/views/Cart.vue'),
      Navbar: () =>  import('@/components/Navbar.vue')
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
