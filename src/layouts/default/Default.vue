<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-app>
    <default-bar :key="$route.fullPath"></default-bar>

    <default-view />
  </v-app>
</template>

<script setup>
import DefaultBar from "../../components/Navbar.vue";
import DefaultView from "./View.vue";
</script>
