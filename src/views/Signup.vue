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
        color="#802f59"
        label="First name"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="last"
        color="#802f59"
        label="Last name"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="email"
        color="#802f59"
        label="Email"
        @blur="validateEmail()"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="password"
        color="#802f59"
        label="Password"
        @blur="validatePassword()"
        placeholder="Enter your password"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-if="showOtpField"
        v-model="otp"
        color="primary"
        label="OTP"
        variant="underlined"
      ></v-text-field>
    </v-container>
    <v-btn
      @click="handleSubmit"
      color="#802f59"
      :disabled="!email || !password || !first || !last"
      v-if="!showOtpField"
    >
      Request OTP
    </v-btn>
    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
        @click="validateOtp"
        :disabled="!email || !password || !first || !last || !otp"
        color="success"
      >
        Complete Registration

        <v-icon icon="mdi-chevron-right" end></v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  data: () => ({
    first: null,
    last: null,
    email: null,
    password: null,
    emailError: "",
    otp: "",
    showOtpField: false,
  }),
  methods: {
    async handleSubmit() {
      if (!this.emailError) {
        try {
          let data = {
            name: this.first + " " + this.last,
            email: this.email,
            password: this.password,
          };
          // Your sign-up form submission logic here
          // For example, you can send the form data to a server
          // console.log(data)
          const res = await fetch(`${import.meta.env.VITE_URL}/user/signup`, {
            method: "POST",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          data = await res.json();
          if (data?.success) {
            toast.info("Check your mail for OTP", { autoclose: 2000 });
            this.showOtpField = true;
          } else {
            toast.error(data.message, { autoclose: 2000 });
          }
          console.log(data.message);
          // this.$router.push("/login");
        } catch (error) {
          console.log(error);
        }
      }
    },
    async validateOtp() {
      try {
        // Make an HTTP POST request to your server to validate the entered OTP
        const response = await fetch(
          `${import.meta.env.VITE_URL}/user/validate`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: this.email, // Pass the user's email to the server
              otp: this.otp, // Pass the entered OTP to the server
            }),
          }
        );

        const data = await response.json();

        if (data?.success) {
          toast.info(data.message, { autoclose: 2000 });

          this.$router.push("/login");
        } else {
          toast.error(data?.message, { autoclose: 2000 });

          // If the entered OTP is incorrect, show an error message or take appropriate action
          // console.log("Incorrect OTP. Please try again.");
        }
      } catch (error) {
        console.log("Error validating OTP:", error);
      }
    },

    validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!this.email.match(emailPattern)) {
        toast.info("Enter a valid email address:)", { autoclose: 2000 });
      }
    },
    validatePassword() {
      if (this.password.length < 6) {
        toast.info("Password must be 6 char long", { autoclose: 2000 });
      }
    },
  },
};
</script>
