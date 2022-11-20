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
            name: 'novelChapter',
            component:()=>import('../views/pages/novel/novelChapter.vue')
          },
          {
            path:"/novel/:id/:chapterId",
            name: 'novelAdd',
            component:()=>import('../views/pages/novel/novelAdd.vue')
          },
        ]
    }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由守卫 登录拦截 本地没有存token,请重新登录
router.beforeEach((to, from, next) => { 
  if (to.path === '/login') {
      next();  
  } else {
      let token = localStorage.getItem('Authorization');    
      if (token === 'null' || token === '') {
          next('/login');    
      } else {
          next();    
      }  
  }
});

/**
 * 导出 基础路由  
 **/
export default router