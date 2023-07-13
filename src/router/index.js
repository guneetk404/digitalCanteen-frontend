// Composables
import { createRouter, createWebHistory } from 'vue-router'

import Menu from '../views/Menu.vue'
import Login from '../views/Login.vue'
// import Home from '../views/Home'
import Signup from '../views/Signup.vue'
import Cart from '../views/Cart.vue'
import User from '../views/User'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      
    ],
  },
  
  {
        path: '/login',
        name: 'Login',
        component: Login
      },
      {
        path: '/user/:id',
        name: 'User',
        component: User,
        props: true
      },
      {
        path: '/signup',
        name: 'Signup',
        component: Signup
      },
      {
        path: '/cart',
        name: 'Cart',
        component: Cart
      },
      {
        path: '/menu',
        name: 'Menu',
        component: Menu
      },

    
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router


// import { createRouter, createWebHistory } from 'vue-router'
// //import Menu from '../views/Menu.vue'
// import Login from '../views/Login.vue'
// import Home from '../views/Home'
// // import Signup from '../views/Signup.vue'
// // import Cart from '../views/Cart.vue'
// // import User from '../views/User'
// const routes = [
//   {
//     path: '/',
//     name: 'HelloWorld',
//     component: Home
//   },
//   {
//     path: '/login',
//     name: 'Login',
//     component: Login
//   },
//   // {
//   //   path: '/user/:id',
//   //   name: 'User',
//   //   component: User,
//   //   props: true
//   // },
//   // {
//   //   path: '/signup',
//   //   name: 'Signup',
//   //   component: Signup
//   // },
//   // {
//   //   path: '/cart',
//   //   name: 'Cart',
//   //   component: Cart
//   // }
// ]
// // const routes = [
// //   {
// //     path: '/',
// //     component: () => import('@/layouts/default/Default.vue'),
// //     children: [
// //       {
// //         path: '',
// //         name: 'Home',
// //         component: () => import( '@/views/Menu.vue'),
// //       },
// //     ],
// //   },
// // ]
// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes,
// })
// export default router
