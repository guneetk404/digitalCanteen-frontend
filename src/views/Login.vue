<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-sheet id="01" class="login-container pa-12" rounded>
    <span class="title"> Argus Canteen </span>
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-text-field
          v-model="email"
          :readonly="loading"
          :rules="[required]"
          @blur="validateEmail()"
          class="mb-2"
          clearable
          label="Email"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :readonly="loading"
          :rules="[required]"
          @blur="validatePassword()"
          clearable
          label="Password"
          placeholder="Enter your password"
        ></v-text-field>
        <br />
        <v-btn
          :disabled="!form"
          :loading="loading"
          block
          color="success"
          size="large"
          type="submit"
          variant="elevated"
        >
          Sign In
        </v-btn>
      </v-form>
      <div class="newbtn">
        <router-link to="/user/resetpassword"
          ><a>Forgot Password?</a></router-link
        >
        <router-link to="/signup"><a>Register Here</a></router-link>
      </div>
    </v-card>
  </v-sheet>
</template>
<script>
import store from "@/store";
import tryLogin from "../controller/loginController";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default {
  data: () => ({
    form: false,
    email: null,
    password: null,
    loading: false,
  }),
  methods: {
    async onSubmit() {
      if (!this.form) return;
      this.loading = true;

      try {
        let data = {
          email: this.email,
          password: this.password,
        };
        if (await tryLogin(data)) {
          this.loading = false;
          if (store.getters.getAdmin) {
            this.$router.push("/admin");
          } else {
            this.$router.push("/");
          }
          toast.success("Successfully Logged in:)", { autoclose: 2000 });
          return;
        }
        this.loading = false;
      } catch (error) {
        // console.log(error);
        toast.error("try loggin again", { autoclose: 2000 });
        this.loading = false;
      }
    },
    required(v) {
      return !!v || "Field is required";
    },
    validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!this.email.match(emailPattern)) {
        toast.info("Enter a valid email address:)", { autoclose: 2000 });
      }
    },
    validatePassword() {
      if (this.password?.length < 6) {
        toast.info("Password must be 6 Char long", { autoclose: 2000 });
      }
    },
  },
};
</script>
<style>
.login-container {
  margin-left: 20%;
  margin-right: 20%;
  margin-top: 40px;
  padding: 10% !important;
  background-color: #802f59 !important;
  border-radius: 20px !important;
}

.newbtn {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

a {
  text-decoration: none;
  color: "#802F59";
}
.title {
  font-size: 25px;
  color: white;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
</style>
