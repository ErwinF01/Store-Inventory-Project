
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    path: '/todos',
    component: () => import('pages/TodoApp.vue'),
    // children: [
    //   { path: '', component: () => import('pages/IndexPage.vue') }
    // ]
  },
  {
  path: '/tdc',
    component: () => import('pages/TDC.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    path: '/inventory',
      component: () => import('pages/StoreInventory.vue'),
      // children: [
      //   { path: '', component: () => import('pages/IndexPage.vue') }
      // ]
    },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
