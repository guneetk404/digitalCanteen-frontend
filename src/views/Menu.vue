<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="menu">
    <div class="heading">
      <h1>Argus Canteen</h1>
      <h3>&mdash; MENU &mdash;</h3>
    </div>
    <div v-for="item in items" :key="item">
      <single-card :item="item"></single-card>
    </div>
  </div>
</template>
<script>
import SingleCard from "@/components/SingleCard.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default {
  components: { SingleCard },
  data() {
    return {
      items: [],
      itemsCart: [],
    };
  },
  async mounted() {
    // console.log("menu called");
    const res = await fetch("http://localhost:3001/items", {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    if (!data.success) {
      toast.error("Something went wrong", { autoclose: 2000 });
    }
    this.items = data.data;
  },
};
</script>
<style>
.heading {
  background-color: #802f59;
  color: #ffffff;
  margin-bottom: 30px;
  padding: 38px 0px 26px 0;
  grid-column: 1/-1;
  text-align: center;
}
.heading > h1 {
  font-weight: 400;
  font-size: 30px;
  letter-spacing: 10px;
  margin-bottom: 10px;
}
.heading > h3 {
  font-weight: 600;
  font-size: 22px;
  letter-spacing: 5px;
}
</style>
