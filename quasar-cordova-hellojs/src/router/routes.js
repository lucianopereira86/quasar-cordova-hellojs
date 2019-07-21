const routes = [
  {
    path: '/',
    component: () => import('layouts/Auth.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('pages/Login.vue'),
        meta: { showHeader: true }
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('pages/Register.vue'),
        meta: { showHeader: true, showBack: true }
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/Main.vue'),
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('pages/Index.vue')
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
