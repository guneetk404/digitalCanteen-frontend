// import router from "@/router";
import store from "@/store";




const userDetails=async ()=> {
    if (store.getters.getToken) {
      console.log("mounted in users page");
      // const res = await fetch("http://localhost:3001/user/verify", {
      //   method: "POST",
      //   headers: {
      //     "content-Type": "application/json",
      //     "x-access-token": localStorage.getItem("token"),
      //   },
      // });
      // const data = await res.json();
      // console.log("from users controller", data);
        const res = await fetch(
          `http://localhost:3001/user`,
          {
            method: "POST",
            headers: {
              "content-Type": "application/json",
              "x-access-token": localStorage.getItem("token"),
            },
          }
        );
        const data = await res.json();
        return data;
        
    }else{
      console.log('You are not logged in')
    }
  }



  export default userDetails;