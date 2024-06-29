import { createRouter, createWebHistory} from 'vue-router';
// import Test from '../view/Test/index.vue'
const routes = [
  {
    name: "Layout",
    path: '/',
    redirect: "/home",
    component: () => import('../components/layout/index.vue'),
    children: [
      {
        name: 'Home',
        path: 'home',
        component: () => import('../view/Home/index.vue'),
      },
      {
        name: 'Article',
        path: 'article',
        component: () => import('../view/Article/index.vue'),
      },
      {
        name: 'Talk',
        path: 'talk',
        component: () => import('../view/Talk/index.vue'),
      },
      {
        name: 'Archive',
        path: 'archive',
        component: () => import('../view/Archive/index.vue'),
      },
      {
        name: 'More',
        path: 'more',
        children: [
          {
            name: 'About',
            path: 'about',
            component: () => import('../view/About/index.vue'),
          }
        ]
      }
    ],
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router