<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-card
    class="mx-auto"
    max-width="344"
    title="Reset Password"
    style="margin-top: 50px"
  >
    <v-container>
      <v-text-field
        v-model="email"
        color="#802f59"
        label="Email"
        @blur="validateEmail()"
        variant="underlined"
      ></v-text-field>

      <v-text-field
      v-if="showOtpField"
        v-model="newPassword"
        color="#802f59"
        label="newPassword"
        placeholder="Enter your password"
        variant="underlined"
      ></v-text-field>
      <v-text-field
      v-if="showOtpField"
        v-model="confirmPasswordpassword"
        color="#802f59"
        label="confirmPassword"
        placeholder="Enter your password"
        variant="underlined"
      ></v-text-field>
      <v-text-field
        v-if="showOtpField"
        v-model="otp"
        color="#802f59"
        label="OTP"
        variant="underlined"
      ></v-text-field>

      <v-btn @click="handleSubmit" color="#802f59" v-if="!showOtpField">
        Request OTP
      </v-btn>
    </v-container>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn @click="validateOtp" color="#802f59">
        reset Password

        <v-icon icon="mdi-chevron-right" end></v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    email: null,
    newPassword: null,
    confirmPassword: null,
    otp: "",
    showOtpField: false,
  }),

  methods: {
    async handleSubmit() {
        try {
          let data = {
            // name: this.first + " " + this.last,
            email: this.email,
            newpassword: this.newPassword,
            confirmPassword: this.confirmPassword
          };
          console.log("inside for sub");
          const res = await fetch("http://localhost:3001/user/reset", {
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
    },
    async validateOtp() {
      try {
        const response = await fetch('http://localhost:3001/user/changepass', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.email, // Pass the user's email to the server
            otp: this.otp,
            password:this.newPassword // Pass the entered OTP to the server
          }),
        });

        const data = await response.json();

        if (data.success) {
          // If the entered OTP is correct, proceed with form submission
          // await this.handleSubmit();
          this.$router.push("/login");

        } else {
          // If the entered OTP is incorrect, show an error message or take appropriate action
          console.log('Incorrect OTP. Please try again.');
        }
      } catch (error) {
        console.log('Error validating OTP:', error);
      }
    },
    async show(){
      this.showOtpField = true;
    }
  },
};
</script>
