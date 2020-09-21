import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/home'
    },
    {
      path:'/index',
      component:()=>import('@/pages/Index'),
      children:[{
          path:'/home',
          component:()=>import('@/pages/Home')
        },
        {
          path:'/menu',
          component: () => import('@/pages/Menu/Menu')
        },
        {
          path:'/menu/add',
          component:()=>import('@/pages/Menu/Menuadd')
        },
       {
         path:'/menu/edit',
         component:()=>import('@/pages/Menu/Menuadd')
       },
       {
        path:'/role',
        component: () => import('@/pages/Role/Role')
      },
      {
        path:'/role/add',
        component:()=>import('@/pages/Role/Roleadd')
      },
     {
       path:'/role/edit',
       component:()=>import('@/pages/Role/Roleadd')
     },
       {
        path:'/user',
        component: () => import('@/pages/User/User')
      },
      {
        path:'/user/add',
        component:()=>import('@/pages/User/Useradd')
      },
     {
       path:'/user/edit',
       component:()=>import('@/pages/User/Useradd')
     },
       {
        path:'/cate',
        component: () => import('@/pages/Cate/Cate')
      },
      {
        path:'/cate/add',
        component:()=>import('@/pages/Cate/Cateadd')
      },
     {
       path:'/cate/edit',
       component:()=>import('@/pages/Cate/Cateadd')
     },
       {
        path:'/specs',
        component: () => import('@/pages/Specs/Specs')
      },
      {
        path:'/specs/add',
        component:()=>import('@/pages/Specs/Specsadd')
      },
     {
       path:'/specs/edit',
       component:()=>import('@/pages/Specs/Specsadd')
     },
       {
        path:'/goods',
        component: () => import('@/pages/Goods/Goods')
      },
      {
        path:'/goods/add',
        component:()=>import('@/pages/Goods/Goodsadd')
      },
     {
       path:'/goods/edit',
       component:()=>import('@/pages/Goods/Goodsadd')
     },
      ]
    },
    {
      path:'/login',
      component:()=>import('@/pages/Login/Login')
    }
   
  ]
})
