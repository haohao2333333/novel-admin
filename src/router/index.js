import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store/index.js'

const routes = [
    { 
      path: '/login', 
      name: 'login', 
      component: import('../views/Login.vue'),
      hidden: true
    },
    { 
      path: '/', 
      name: 'layout',
      component: import('../views/LayOut/Layout.vue'),
      hidden: true,
      redirect: '/index',
        // 嵌套路由
        children:[
          {
            path:"/index",
            name: 'index',
            component:()=>import('../views/pages/index.vue')
          },
          {
            path:"/user",
            name: 'user',
            component:()=>import('../views/pages/usersList.vue')
          },
          {
            path:"/role",
            name: 'role',
            component:()=>import('../views/pages/rolesList.vue')
          },
          {
            path:"/novel",
            name: 'novel',
            component:()=>import('../views/pages/novel/novel.vue')
          },
          {
            path:"/novel/:id",
            name: 'novelAdd',
            component:()=>import('../views/pages/novel/novelChapter.vue')
          },
        ]
    }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由守卫
router.beforeEach((to,from,next)=>{
  /* 
      to: 从哪个页面
      from: 到哪个页面
      next: 只有执行next 页面才会进行跳转
  */
  // 判断用户是否登录
  const uInfo = store.state.uInfo.userInfo
  if(!uInfo.username){
    if(to.path=='/login'){
      next()
      return
    }
    next("/login")
  }else{
    next()
  }

})

/**
 * 导出 基础路由  
 **/
export default router