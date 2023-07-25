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

      <v-checkbox
        v-model="terms"
        color="secondary"
        label="I agree to site terms and conditions"
      ></v-checkbox>
    </v-container>
    <v-btn @click="handleSubmit" color="#802f59" v-if="!showOtpField">
      Request OTP
    </v-btn>
    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn @click="validateOtp" color="success">
        Complete Registration

        <v-icon icon="mdi-chevron-right" end></v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
// import { toast } from "vue3-toastify";
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
          const res = await fetch("http://localhost:3001/user/signup", {
            method: "POST",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          data = await res.json();
          console.log(data.message);
          this.showOtpField = true;

          // this.$router.push("/login");
        } catch (error) {
          console.log(error);
        }
      }
    },
    // async requestOtp() {
    //   try {
    //     // Make an HTTP POST request to your server to request OTP
    //     const response = await fetch('http://localhost:3001/user/otp', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         email: this.email, // Pass the user's email to the server
    //       }),
    //     });

    //     const data = await response.json();

    //     if (data.success) {
    //       // Show the OTP field and clear any previous OTP
    //       this.showOtpField = true;
    //       this.otp = '';
    //     } else {
    //       console.log('Failed to request OTP. Please try again.');
    //     }
    //   } catch (error) {
    //     console.log('Error requesting OTP:', error);
    //   }
    // },
    async validateOtp() {
      try {
        // Make an HTTP POST request to your server to validate the entered OTP
        const response = await fetch("http://localhost:3001/user/validate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.email, // Pass the user's email to the server
            otp: this.otp, // Pass the entered OTP to the server
          }),
        });

        const data = await response.json();

        if (data.success) {
          // If the entered OTP is correct, proceed with form submission
          // await this.handleSubmit();
          this.$router.push("/login");
        } else {
          // If the entered OTP is incorrect, show an error message or take appropriate action
          console.log("Incorrect OTP. Please try again.");
        }
      } catch (error) {
        console.log("Error validating OTP:", error);
      }
    },

    validateEmail() {
      console.log("inside validateEmail");
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!this.email.match(emailPattern)) {
        this.emailError = "Please enter a valid email address.";
      } else {
        this.emailError = "";
      }
      console.log(this.emailError);
    },
  },
};
</script>
