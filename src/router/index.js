// Composables
import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

// console.log(this.$store);

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/Home.vue"),
      },
    ],
  },

  {
    path: "/login",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Login",
        component: () => import("@/views/Login.vue"),
      },
    ],
  },
  {
    path: "/user/profile",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Profile",
        component: () => import("@/views/User.vue"),
        props: true,
      },
    ],
  },
  {
    path: "/user/orders",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Orders",
        component: () => import("@/views/Orders.vue"),
        props: true,
      },
    ],
  },
  {
    path: "/user/resetpassword",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "resetPassword",
        component: () => import("../views/forgetPass"),
        props: true,
      },
    ],
  },
  {
    path: "/signup",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Signup",
        component: () => import("@/views/Signup.vue"),
      },
    ],
  },
  {
    path: "/user/cart",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Cart",
        component: () => import("@/views/Cart.vue"),
      },
    ],
  },
  {
    path: "/admin",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "admin",
        component: () => import("@/views/AdminPage.vue"),
      },
    ],
  },
  {
    path: "/admin/orders",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "adminOrders",
        component: () => import("@/views/Orders.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "NotFound",
        component: () => import("@/views/NotFound.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to) => {
  if (to.path == "/logout") {
    localStorage.clear();
    store.commit("setToken", null);
    router.push("/login");
    // toast.success("You have been successfully logged out", { autoclose: 2000 });
  }

  if (to.path == "/signup" || to.path == "/login") {
    const token = localStorage.getItem("token");
    console.log("in routes login page");
    if (token && token === store.getters.getToken) {
      console.log("you are already logged in");
      router.push("/");
      toast.info("You are already logged in", { autoclose: 2000 });
    }
  }
  if (
    to.path == "/user/profile" ||
    to.path == "/user/orders" ||
    to.path == "/user/cart" ||
    to.path == "/user/profile"
  ) {
    const token = localStorage.getItem("token");
    console.log("in routes user verification page");
    if (!(token && token === store.getters.getToken)) {
      // console.log('Please login first')
      router.push("/login");
      toast.info("Please login first", { autoclose: 2000 });
      return;
    }
    if (store.getters.getAdmin && (to.path == "/user/cart" || to.path == "/")) {
      router.push("/admin");
      toast.info("You can only access admin pages", { autoclose: 2000 });
    }
  }
  return true;
});

export default router;
