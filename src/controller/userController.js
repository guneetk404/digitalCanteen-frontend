// import router from "@/router";
import store from "@/store";

const userDetails = async () => {
  if (store.getters.getToken) {
    // console.log("mounted in users page");

    const res = await fetch(`${import.meta.env.VITE_URL}/user`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    return data;
  }
};

export default userDetails;
