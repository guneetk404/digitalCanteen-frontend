<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-card
    class="mx-auto"
    max-width="344"
    title="User Registration"
    style="margin-top: 50px"
  >
    <v-container>
      <v-text-field
        v-model="first"
        color="primary"
        label="First name"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="last"
        color="primary"
        label="Last name"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="email"
        color="primary"
        label="Email"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="password"
        color="primary"
        label="Password"
        placeholder="Enter your password"
        variant="underlined"
      ></v-text-field>

      <v-checkbox
        v-model="terms"
        color="secondary"
        label="I agree to site terms and conditions"
      ></v-checkbox>
    </v-container>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn @click="handleSubmit" color="success">
        Complete Registration

        <v-icon icon="mdi-chevron-right" end></v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { toast } from 'vue3-toastify';
import "vue3-toastify/dist/index.css";

export default {
  data: () => ({
    first: null,
    last: null,
    email: null,
    password: null,
    terms: false,
  }),
  methods: {
    async handleSubmit() {
      try {
        let data = {
          name: this.first + " " + this.last,
          email: this.email,
          password: this.password,
        };
        // console.log(data)
        const res = await fetch("http://localhost:3001/user/signup", {
          method: "POST",
          headers: { "content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        data = await res.json();
        if(data.success){
          toast.success("Successfully signed up, kindly login now:)", { autoclose: 2000 });

        }else{
          toast.error(`${data.message}:)`, { autoclose: 2000 });
        }
        // console.log(data.message);
        this.$router.push("/login");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
