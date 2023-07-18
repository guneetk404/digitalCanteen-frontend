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
export default {
  components: { SingleCard },
  data() {
    return {
      items: [
        {
          name: "sandwich",
          desc: "veg sandwich with bla bla bla",
          price: 25,
          img: "src/assets/sandwich.png",
        },
        {
          name: "sandwich1",
          desc: "veg sandwich with bla bla bla",
          price: 35,
          img: "src/assets/burger.png",
        },
        {
          name: "sandwich2",
          desc: "veg sandwich with bla bla bla",
          price: 25,
          img: "src/assets/sandwich.png",
        },
        {
          name: "sandwich3",
          desc: "veg sandwich with bla bla bla",
          price: 25,
          img: "src/assets/sandwich.png",
        },
        {
          name: "sandwich4",
          desc: "veg sandwich with bla bla bla",
          price: 25,
          img: "src/assets/sandwich.png",
        },
        {
          name: "sandwich5",
          desc: "veg sandwich with bla bla bla",
          price: 25,
          img: "src/assets/sandwich.png",
        },
        {
          name: "sandwich6",
          desc: "veg sandwich with bla bla bla",
          price: 25,
          img: "src/assets/sandwich.png",
        },
        {
          name: "sandwich7",
          desc: "veg sandwich with bla bla bla",
          price: 25,
          img: "src/assets/sandwich.png",
        },
        {
          name: "sandwich8",
          desc: "veg sandwich with bla bla bla",
          price: 25,
          img: "src/assets/sandwich.png",
        },
        {
          name: "sandwich9",
          desc: "veg sandwich with bla bla bla",
          price: 25,
          img: "src/assets/sandwich.png",
        },
      ],
    };
  },
  async mounted() {
    console.log("menu called");
    const res = await fetch("http://localhost:3001/items", {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    this.items = data.data;
   
  },
};
</script>
<style>
.heading {
  background-color: hsl(245, 53%, 47%);
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
