import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Main from '@/views/Main.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path:"/",
    component:Main,
    redirect:'/word'
  },
  {
    path:'/word',
    component: Main,
    redirect:'/word/index',
    children:[
      {
        path:"index",
        component:()=> import('@/views/Word.vue')
      }
    ]
  },
  {
    path:'/post',
    component:Main,
    redirect:'/post/index',
    children:[
      {
        path:'index',
        component:()=>import('@/views/Post.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
