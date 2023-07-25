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
    };
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
    setCart(state, payload) {
      console.log(payload.quantity);
      var found = false;
      state.cartItems.forEach((e) => {
        console.log(e);
        if (e.id == payload.id) {
          e.quantity++;
          found = true;
          return;
        }
      });
      if (!found) state.cartItems.push(payload);
      found = false;
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
  },
  modules: {},
});
