// Composables
import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index'

// console.log(this.$store);

const routes = [
      {
        path: '/',
        component: () => import('@/layouts/default/Default.vue'),
        children: [
          {
            path: '',
            name: 'Home',
            component: () => import('@/views/Home.vue'),
          },
          
        ],
      },
  
      {
            path: '/login',
            component: () => import('@/layouts/default/Default.vue'),
        children: [
          {
            path: '',
            name: 'Login',
            component: () => import('@/views/Login.vue'),
          },
          
        ],
            
      },
      {
        path: '/user/profile',
        component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Profile',
        component: () => import('@/views/User.vue'),
        props: true
      },
      
    ],
        
  },
  {
    path: '/user/orders',
    component: () => import('@/layouts/default/Default.vue'),
children: [
  {
    path: '',
    name: 'Orders',
    component: () => import('@/views/Orders.vue'),
    props: true
  },
  
],
    
},
  {
    path: '/signup',
    component: () => import('@/layouts/default/Default.vue'),
children: [
  {
    path: '',
    name: 'Signup',
    component: () => import('@/views/Signup.vue'),
  },
  
],
    
},
{
  path: '/user/cart',
  component: () => import('@/layouts/default/Default.vue'),
children: [
{
  path: '',
  name: 'Cart',
  component: () => import('@/views/Cart.vue'),
},

],
  
}, 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
router.beforeEach( (to) => {
  if(to.path=='/logout'){
    localStorage.clear();
    store.commit('setToken',null)
    router.push('/login')
  }
  // if(to.path=='/login'){
  //   const token= localStorage.getItem('token')
  //   console.log('in routes login page', from.path)
  //   if(token && token===store.getters.getToken){
      
  //     console.log('you are already logged in')
  //     router.push('/')
  //   }
  // }
  if(to.path=='/signup' || to.path=='/login'){
    const token= localStorage.getItem('token')
    console.log('in routes login page')
    if(token && token===store.getters.getToken){
      console.log('you are already logged in')
      router.push('/')
    }
  }
  if(to.path=='/user/profile' ||to.path=='/user/orders' || to.path=='/user/cart' || to.path=='/user/profile'){
    const token= localStorage.getItem('token')
    console.log('in routes user verification page')
    if(!(token && token===store.getters.getToken)){
      console.log('Please login first')
      router.push('/login')
    }
  }
  return true;

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
