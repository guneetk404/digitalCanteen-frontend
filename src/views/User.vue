<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="user-card-container">
    <div class="user-card">
      <div class="user-card-image-container">
        <!-- <v-icon icon="mdi-account" class="user-card-image" /> -->
        <img class="user-card-image" />
      </div>

      <div class="user-details-container">
        <p class="user-details-username">{{ userName }}</p>
        <p v-if="isAdmin">You are an Admin</p>
        <p class="user-details-email">{{ userEmail }}</p>
      </div>

      <div class="action-btn-container">
        <button @click="onLogout" class="btn-logout">{{ logoutValue }}</button>
      </div>
    </div>
  </div>
</template>
<script>
// import store from "@/store";
import router from "@/router";
import userDetails from "@/controller/userController";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import store from "@/store";

export default {
  data: () => ({
    userEmail: "abc@example.com",
    userName: "kindly login",
    logoutValue: "Login",
    isAdmin: store.getters.getAdmin
  }),
  methods: {
    async onLogout() {
      this.menu = false;
      if (this.logoutValue == "Logout") {
        toast.success("Logged out Successfully", { autoclose: 2000 });

        (this.logoutValue = "Login"), router.push("/logout");
        (this.userEmail = null),
          (this.userName = "Login for better experience"),
          (this.logoutValue = "Login");

        console.log("logged out successfully");
      } else {
        router.push("/login");
        toast.error("Something went wrong in logout", { autoclose: 2000 });

        // console.log("problem in logout");
      }
    },
  },
  async mounted() {
    try {
      var data = await userDetails();
      if (data.success) {
        this.userEmail = data.body.email;
        this.userName = data.body.name;
        this.logoutValue = "Logout";
        return;
      }
    } catch (error) {
      toast.error(`Something went wrong in fetching your details`, {
        autoclose: 2000,
      });

      console.log("error", error);
    }
    toast.error(`${data.message}:)`, { autoclose: 2000 });

    // console.log("not able to verify user");
    this.userEmail = null;
    this.userName = "Login for better experience";
    this.logoutValue = "Login";
  },
};
</script>
<style>
.user-card-container {
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #802f59;
  margin-left: 20%;
  margin-right: 20%;
  margin-top: 30px;
  border-radius: 10px;
  box-shadow: 2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
    6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
    12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
    22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
    41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
    100px 100px 80px rgba(0, 0, 0, 0.07);
  color: white;
}
.user-card {
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.user-card-image-container {
  height: 150px;
  width: 150px;
  border-radius: 50%;
  background-color: white;
}
.btn-logout {
  background-color: white;
  color: black;
  padding: 10px;
  padding-right: 30px;
  padding-left: 30px;
  border-radius: 5px;
}
.user-details-username {
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 2rem;
}

.user-details-email {
  padding-bottom: 10px;
  font-size: 1.5rem;
}
</style>
