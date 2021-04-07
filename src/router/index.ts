import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Main from '@/layout/Main.vue'


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
        component:()=> import('@/views/words/Word.vue')
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
        component:()=>import('@/views/post/Post.vue')
      },
      {
        path:'editor',
        component:()=>import('@/views/post/Editor.vue')
      },
      {
        path:'editor/:postId',
        component:()=>import('@/views/post/Editor.vue'),
        props:true
      }
    ]
  },
  {
    path:'/sys',
    component:Main,
    redirect:'/sys/index',
    children:[
      {
        path:'index',
        component:()=>import("@/views/sys/Sys.vue")
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
