<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <v-sheet id="01" class="login-container pa-12" rounded>
      <v-card class="mx-auto px-6 py-8" max-width="344">
        <v-form
          v-model="form"
          @submit.prevent="onSubmit"
        >
          <v-text-field
            v-model="email"
            :readonly="loading"
            :rules="[required]"
            class="mb-2"
            clearable
            label="Email"
          ></v-text-field>
          <v-text-field 
            v-model="password"
            :readonly="loading"
            :rules="[required]"
            clearable
            label="Password"
            placeholder="Enter your password"
          ></v-text-field>
          <br>
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
      </v-card>
    </v-sheet>
  </template>
  <script>
    export default {
      data: () => ({
        form: false,
        email: null,
        password: null,
        loading: false,
      }),
      methods: {
        async onSubmit () {
          if (!this.form) return
          this.loading = true

          // setTimeout(() => (this.loading = false), 2000)

          try {
          let data={
        email: this.email,
        password: this.password
          }

      console.log(data)
      const res= await fetch('http://localhost:3001/user/login',{
        method: 'POST',
        headers: {'content-Type': 'application/json'},
        body: JSON.stringify(data)
      });
      data= await res.json();
      this.loading = false;
      console.log(data);
      await this.$store.commit('setToken', data.accessToken);
       localStorage.setItem('token', data.accessToken);
      console.log("token set in localstorage")
      this.$router.push('/')
      } catch (error) {
          console.log(error);
          this.loading = false;
        }
        },
        required (v) {
          return !!v || 'Field is required'
        },
      },
    }
  </script>
  <style>
  .login-container{
    margin-left: 20%;
    margin-right: 20%;
    margin-top: 40px;
    padding: 10% !important;
    background-color: hsl(245, 53%, 47%) !important;
    border-radius: 20px !important;
  }
  </style>