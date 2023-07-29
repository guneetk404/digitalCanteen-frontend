import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  state() {
    return {
      token: null,
      cartItems: [],
      isAdmin: false,
    };
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
    setAdmin(state, payload) {
      state.isAdmin = payload;
    },
    async setCart(state, payload) {
      var found = false;
      var cart = state.cartItems;

      cart.forEach((e) => {
        // console.log(e, "rr", payload);
        if (e.id == payload.id) {
          found = true;
          return;
        }
      });
      if (!found) {
        console.log('me')
        state.cartItems.push(payload);
        found=true;
      }
    },
    updateCart(state, payload) {
      state.cartItems = payload;
    },
    clearCart(state) {
      state.cartItems = [];
    },
  },
  actions: {},
  getters: {
    getToken(state) {
      return state.token;
    },
    getCart(state) {
      return state.cartItems;
    },
    getAdmin(state) {
      return state.isAdmin;
    },
  },
  modules: {},
});
