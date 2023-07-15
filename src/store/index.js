import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate"


export default createStore({
    plugins:[createPersistedState({
        storage:window.sessionStorage
    })],
   state(){
    return {
        token: null,
        cartItems:[]
    }},
    mutations:{
        setToken(state, payload){
            state.token= payload
        },
        setCart(state, payload){
            state.cartItems.push(payload)
        },
        clearCart(state){
            state.cartItems=[]
        }
    },
    actions:{
    
    },
    getters:{
        getToken(state){
            return state.token;
        },
        getCart(state){
            return state.cartItems
        }
    },
    modules:{

    }
})