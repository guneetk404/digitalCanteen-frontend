import store from "@/store";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import router from "@/router";


 const tryLogin= async(data)=> {
    // if (!this.form) return;
    // this.loading = true;

    // setTimeout(() => (this.loading = false), 2000)

    try {
      // console.log(data);
      const res = await fetch(`${import.meta.env.VITE_URL}/user/login`, {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(data),         
      });
      data = await res.json();
      // this.loading = false;
      if(data?.success){
        if(data?.email=="satyams@argusoft.com"){
          console.log(data);
          store.commit("setAdmin",true)
        }else{
          store.commit("setAdmin",false)
        }
       store.commit("setToken", data.accessToken);
      localStorage.setItem("token", data.accessToken);
      console.log("token set in localstorage");
      return true;
      }
      toast.error(`${data.message}`,{autoclose:2000})
      if(data?.message=="Please signup first"){
        router.push('/signup')
      }

      return false;
      
      
    //   this.$router.push("/");
    } catch (error) {
      toast.error('Something went wrong',{autoclose:2000})

      console.log(error);
    //   this.loading = false;
    }
  }

  export default tryLogin;