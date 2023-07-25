<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-app-bar :elevation="5">
    <v-menu transition="scale-transition">
      <template v-slot:activator="{ props }">
        <v-btn color="#802f59" v-bind="props">
          <v-icon icon="mdi-menu" />
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i">
          <v-list-item-title
            @click="onList(item.title)"
            class="navbar-dropdown"
          >
            <!-- <router-link :to="{ name: item.path }" class="link">
              {{ item.title }}
            </router-link> -->
            {{ item.title }}</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-menu>

    <v-list-item>
      <router-link to="/" class="hbtn">
        <v-btn color="#802f59">
          <v-icon icon="mdi-home" />
        </v-btn>
      </router-link>
    </v-list-item>
    <template v-slot:append>
      <v-menu v-model="menu" :close-on-content-click="false" location="end">
        <template v-slot:activator="{ props }">
          <v-btn color="#802f59" v-bind="props">
            <v-icon icon="mdi-account" />
          </v-btn>
        </template>

        <v-card min-width="300">
          <v-list>
            <v-list-item :title="userName" :subtitle="userEmail">
              <!-- <template v-slot:append>
              <v-btn
                variant="text"
                :class="fav ? 'text-red' : ''"
                icon="mdi-heart"
                @click="fav = !fav"
              ></v-btn>
            </template> -->
            </v-list-item>
          </v-list>

          <!-- <v-divider></v-divider> -->

          <v-list>
            <!-- <v-list-item>
            <v-switch
              v-model="message"
              color="purple"
              label="Enable messages"
              hide-details
            ></v-switch>
          </v-list-item> -->

            <!-- <v-list-item>
            <v-switch
              v-model="hints"
              color="purple"
              label="Enable hints"
              hide-details
            ></v-switch>
          </v-list-item> -->
          </v-list>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn variant="text" @click="menu = false"> Cancel </v-btn>
            <v-btn color="primary" variant="text" @click="onLogout">
              {{ logoutValue }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>

      <v-list-item>
        <router-link to="/user/cart" class="hbtn">
          <v-btn color="#802f59">
            <v-icon icon="mdi-cart" />
          </v-btn>
        </router-link>
      </v-list-item>
    </template>
  </v-app-bar>
</template>

<script>
import router from "@/router";
// import store from "@/store";
import userDetails from "@/controller/userController";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  data: () => ({
    items: [
      { title: "Profile", path: "home" },
      { title: "Menu" },
      { title: "Orders" },
      { title: "Cart" },
    ],
    fav: true,
    menu: false,
    message: false,
    hints: true,
    userEmail: null,
    userName: "login for better experience",
    logoutValue: "Login",
  }),
  methods: {
    async onLogout() {
      this.menu = false;
      if (this.logoutValue == "Logout") {
        router.push("/logout");
        (this.userEmail = null),
          (this.userName = "Login for better experience"),
          (this.logoutValue = "Login");
          toast.success("Logged out Successfully", { autoclose: 2000 });

        // console.log("logged out successfully");
      } else {
        // toast.error("Something went wrong in logout", { autoclose: 2000 });

        router.push("/login");
      }
    },
    async onList(name) {
      console.log(name);
      if (name == "Profile") router.push(`/user/profile`);

      if (name == "Menu") router.push(`/`);
      if (name == "Cart") router.push(`/user/cart`);
      if (name == "Orders") router.push(`/user/orders`);
    },
  },

  async mounted() {
    try {
      const data = await userDetails();
      // console.log(data);
      if (data?.success) {
        this.userEmail = data.body.email;
        this.userName = data.body.name;
        this.logoutValue = "Logout";
        return;
      }
    } catch (error) {
      console.log("error", error);
    }
    // console.log("not able to verify user");
    this.userEmail = null;
    this.userName = "Login for better experience";
    this.logoutValue = "Login";
  },
};
</script>

<style>
.navbar-dropdown {
  cursor: pointer;
}
</style>
