import store from "@/store";




const userDetails=async ()=> {
    if (store.getters.getToken) {
      console.log("mounted in users page");
      const res = await fetch("http://localhost:3001/user/verify", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
      });
      const data = await res.json();
      console.log("from users controller", data);
      if (data.success) {
        const res1 = await fetch(
          `http://localhost:3001/user/${data.body.email}`,
          {
            method: "POST",
            headers: {
              "content-Type": "application/json",
              "x-access-token": localStorage.getItem("token"),
            },
          }
        );
        const data1 = await res1.json();
        return data1;
        // if (data1.success) {
        //   this.userEmail = data1.body.email;
        //   this.userName = data1.body.name;
        //   this.logoutValue = "Logout";
        // } else {
        //   console.log("not able to verify user");
        //   this.userEmail = null;
        //   this.userName = "Login for better experience";
        //   this.logoutValue = "Login";
        // }
      } else {
        return data.success=false;
      }
    } else {
      this.userEmail = null;
      this.userName = "Login for better experience";
      this.logoutValue = "Login";
    }
  }



  export default userDetails;