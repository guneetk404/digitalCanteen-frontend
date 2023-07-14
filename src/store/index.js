import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate"


export default createStore({
    plugins:[createPersistedState({
        storage:window.sessionStorage
    })],
   state(){
    return {
        token: null
    }},
    mutations:{
        setToken(state, payload){
            state.token= payload
        }
    },
    actions:{
    
    },
    getters:{
        getToken(state){
            return state.token;
        }
    },
    modules:{

    }
})