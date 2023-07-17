import store from "@/store";


 const tryOrders= async(data)=> {
    // if (!this.form) return;
    // this.loading = true;

    // setTimeout(() => (this.loading = false), 2000)

    try {
      console.log(data);
      const res = await fetch("http://localhost:3001/user/login", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      data = await res.json();
      // this.loading = false;
      console.log(data);
      await store.commit("setToken", data.accessToken);
      localStorage.setItem("token", data.accessToken);
      console.log("token set in localstorage");
    //   this.$router.push("/");
    } catch (error) {
      console.log(error);
    //   this.loading = false;
    }
  }

  export default tryOrders;