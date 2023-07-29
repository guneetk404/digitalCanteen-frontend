<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="user-card-container">
    <div class="user-card">
      <div class="color1">
        <avatar :fullname="userName" size="150"></avatar>
      </div>
      <div class="user-details-container">
        <template v-if="editMode">
          <input v-model="editedName" class="edit-name-input" />
          <div class="edit-buttons">
            <button @click="saveEditedName">Save</button>
            <button @click="cancelEdit">Cancel</button>
          </div>
        </template>
        <template v-else>
          <p class="user-details-username">{{ userName }}</p>
          <p v-if="isAdmin">You are an Admin</p>
          <p class="user-details-email">{{ userEmail }}</p>
          <button @click="startEdit" v-if="!isAdmin" class="edit-name-button">
            Edit Name
          </button>
        </template>
      </div>
      <div class="action-btn-container">
        <button @click="onLogout" class="btn-logout">{{ logoutValue }}</button>
      </div>
    </div>
  </div>
</template>
<script>
import router from "@/router";
import userDetails from "@/controller/userController";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import store from "@/store";
import Avatar from "vue-avatar-component";

export default {
  components: { Avatar },
  data: () => ({
    userEmail: "abc@example.com",
    userName: "kindly login",
    logoutValue: "Login",
    isAdmin: store.getters.getAdmin,
    editedName: "",
    editMode: false,
  }),
  methods: {
    async onLogout() {
      this.menu = false;
      if (this.logoutValue == "Logout") {
        await router.push("/logout");
        (this.logoutValue = "Login");
        if(store.getters.getAdmin){
          store.commit("setAdmin",false);
        } 
        
        (this.userEmail = null),
        (this.userName = "Login for better experience"),
        (this.logoutValue = "Login");
        toast.success("Logged out Successfully", { autoclose: 2000 });

        console.log("logged out successfully");
      } else {
        await router.push("/login");
        toast.error("Something went wrong in logout", { autoclose: 2000 });

        // console.log("problem in logout");
      }
    },
    async startEdit() {
      this.editedName = this.userName;
      this.editMode = true;
    },
    async saveEditedName() {
      if (this.editedName.trim() !== "") {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_URL}/user/edit`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token"),

              },
              body: JSON.stringify({ name: this.editedName }),
            }
          );
          const data = await response.json();
          if (response.ok && data.success) {
            this.userName = this.editedName;
            this.editMode = false;
            toast.success("Name updated successfully", { autoclose: 2000 });
          } else {
            toast.error("Failed to update name", { autoclose: 2000 });
          }
        } catch (error) {
          toast.error("An error occurred while updating name", {
            autoclose: 2000,
          });
          console.error("Error updating name:", error);
        }
      } else {
        toast.error("Name cannot be empty", { autoclose: 2000 });
      }
    },
    cancelEdit() {
      this.editMode = false;
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
.edit-name-input {
  width: 100%;
  max-width: 200px;
  padding: 8px;
  margin-bottom: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.edit-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}
.edit-buttons button {
  padding: 8px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.edit-buttons button:first-child {
  background-color: #2196f3;
  color: white;
}
.edit-buttons button:last-child {
  background-color: #ccc;
  color: #333;
}
.edit-name-button {
  margin-top: 10px;
  background-color: white;
  color: black;
  padding: 10px;
  padding-right: 25px;
  padding-left: 25px;
  border-radius: 5px;
}
.btn-logout {
  margin-top: 20px;
}
</style>
