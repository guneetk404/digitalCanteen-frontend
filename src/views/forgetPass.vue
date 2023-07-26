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
        :rules="[required]"
        @blur="validateEmail()"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-if="showOtpField"
        v-model="newPassword"
        color="#802f59"
        label="newPassword"
        @blur="validatePassword()"
        placeholder="Enter your password"
        variant="underlined"
      ></v-text-field>
      <v-text-field
        v-if="showOtpField"
        v-model="confirmPassword"
        color="#802f59"
        @blur="validateConfirmPassword()"
        label="confirmPassword"
        placeholder="Enter your password again"
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

      <v-btn
        @click="validateOtp"
        color="#802f59"
        :disabled="!email || !newPassword || !confirmPassword || !otp"
      >
        reset Password

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
    email: null,
    newPassword: null,
    confirmPassword: null,
    otp: "",
    showOtpField: false,
    able: false,
  }),

  methods: {
    async handleSubmit() {
      try {
        if (!this.able) return;
        let data = {
          // name: this.first + " " + this.last,
          email: this.email,
        };
        // console.log("inside for sub");
        const res = await fetch(`${import.meta.env.VITE_URL}/user/reset`, {
          method: "POST",
          headers: { "content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        data = await res.json();
        console.log(data.message);
        if (data.success) {
          toast.info("Check your mail for OTP", { autoclose: 2000 });
          this.showOtpField = true;
        } else {
          toast.error(data.message, { autoclose: 2000 });
        }

        // this.$router.push("/login");
      } catch (error) {
        console.log(error);
      }
    },
    async validateOtp() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_URL}/user/changepass`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: this.email,
              otp: this.otp,
              password: this.newPassword,
            }),
          }
        );

        const data = await response.json();

        if (data?.success) {
          this.$router.push("/login");
          toast.success(data?.message, { autoclose: 2000 });
        } else {
          toast.error(data?.message, { autoclose: 2000 });
        }
      } catch (error) {
        toast.error("Some error in client side", { autoclose: 2000 });

        console.log("Error validating OTP:", error);
      }
    },
    required(v) {
      return !!v || "Field is required";
    },
    validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!this.email.match(emailPattern)) {
        toast.info("Enter a valid email address:)", { autoclose: 2000 });
        this.able = false;
      } else {
        this.able = true;
      }
    },
    validatePassword() {
      if (this.newPassword.length < 6) {
        toast.info("Password must be 6 character long", { autoclose: 2000 });
      }
    },
    validateConfirmPassword() {
      if (!(this.newPassword === this.confirmPassword)) {
        toast.info("Both password field should be same", { autoclose: 2000 });
      }
    },
    // async show(){
    //   this.showOtpField = true;
    // }
  },
};
</script>
