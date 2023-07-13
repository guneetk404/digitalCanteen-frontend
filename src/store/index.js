import { createStore } from "vuex";


export default createStore({
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