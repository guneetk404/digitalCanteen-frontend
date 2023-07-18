import router from "@/router";
import store from "@/store";




const userOrders=async ()=> {
    if (store.getters.getToken) {
      console.log("mounted in orders page")
        const res = await fetch(
          `http://localhost:3001/orders`, 
          {
            method: "GET",
            headers: {
              "content-Type": "application/json",
              "x-access-token": localStorage.getItem("token"),
            },
          }
        );
        const data = await res.json();
        return data;
        
    }else{
      console.log('pls login')
      router.push('/login')
    }
  }



  export default userOrders;