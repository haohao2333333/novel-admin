import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store/index.js'

/**
 * 基础路由
 * 
* root: true                     在一级栏目显示
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
const routes = [
    { 
      path: '/login', 
      name: 'login', 
       // import('路径') // 懒加载
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
          }
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
  console.log("store",store.state.uInfo)
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