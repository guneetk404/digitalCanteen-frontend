<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="user-card-container">
      <div class="user-card">
      <div class="user-card-image-container">
        <!-- <v-icon icon="mdi-account" class="user-card-image" /> -->
        <img class="user-card-image" >
      </div>

      <div class="user-details-container">
        <p class="user-details-username">{{ userName }}</p>
        <p class="user-details-email">{{ userEmail }}</p>
      </div>

      <div class="action-btn-container">
        <button @click="onLogout" class="btn-logout">{{ logoutValue }}</button>
      </div>
    </div>
    </div>
  </template>
  <script>
  import store from '@/store';
  import router from '@/router';
    export default {
      data: () => ({
        userEmail: "abc@example.com",
        userName: "kindly login",
        logoutValue: 'Login'
      }),
      methods: {
        async onLogout() {
      this.menu = false;
      this.logoutValue= 'Login',
      router.push("/logout");
      this.userEmail = null, this.userName = "Login for better experience", this.logoutValue="Login";
      console.log("logged out successfully");
    },
        
      },
      async mounted() {
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
      console.log("from users page", data);
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
        if (data1.success) {
          this.userEmail = data1.body.email;
          this.userName = data1.body.name;
          this.logoutValue='Logout'
        } else {
          console.log("not able to verify user");
          this.userEmail = null;
          this.userName = "Login for better experience";
          this.logoutValue="Login"
        }
      } else {
        console.log("not able to verify user");
        this.userEmail = null;
        this.userName = "Login for better experience";
        this.logoutValue="Login"
      }
    } else {
      this.userEmail = null;
      this.userName = "Login for better experience";
      this.logoutValue="Login"
    }
    }
  }
  </script>
  <style>
  .user-card-container{
    height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: hsl(245, 53%, 47%);
    margin-left: 20%;
    margin-right: 20%;
    margin-top: 30px;
    border-radius: 10px;
    box-shadow:
  2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
  6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
  12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
  22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
  41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
  100px 100px 80px rgba(0, 0, 0, 0.07)
;
color: white;
  }
  .user-card{
    text-align: center;
  }

  .user-card-image-container{
    height: 150px;
    width: 150px;
    border-radius: 50%;
    background-color: white;
  }
  .btn-logout{
    background-color: white;
    color: black;
    padding: 10px;
    padding-right: 30px;
    padding-left: 30px;
    border-radius: 5px;
  }
  .user-details-username{
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 2rem;
  }

  .user-details-email {
    padding-bottom: 10px;
    font-size: 1.5rem;
  }
  </style>