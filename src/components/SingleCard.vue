<!-- eslint-disable vue/no-parsing-error -->
<template>
  <body>
    <div class="menu">
      <div class="food-items">
        <!-- <img :src="item.img" alt="abc" /> -->
        <div class="details">
          <div class="details-sub">
            <h5>{{ item.name }}</h5>
            <h5 class="price">₹{{ item.price }}</h5>
          </div>
          <p>
            {{ item.description }}
          </p>
          <template v-if="quantity === 0">
            <v-btn class="add-to-cart-button" @click="incrementQuantity"
              >Add to Cart</v-btn
            >
          </template>
          <div v-else>
            <span>
              <v-btn class="decbtn" @click="decrementQuantity">-</v-btn>
              <span> &nbsp{{ quantity }} &nbsp </span>
              <v-btn class="incbtn" @click="incrementQuantity">+</v-btn>
            </span>
          </div>
          <template>
            <v-btn @click="decrementQuantity">-</v-btn>
            <span>{{ quantity }}</span>
            <v-btn @click="incrementQuantity">+</v-btn>
          </template>
        </div>
      </div>
    </div>
  </body>
</template>
<script>
// import store from "@/store";
export default {
  name: "singleCardMenu",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      quantity: 0,
    };
  },
  methods: {
    async incrementQuantity() {
      this.quantity++;
      // console.log(this.item)
      if (this.quantity) {
        var k = this.item;

        k.quantity = this.quantity;
        // console.log(k.quantity);
        await this.$store.commit("setCart", k);
      }
    },
    async decrementQuantity() {
      if (this.quantity > 0) {
        this.quantity--;
        if (this.quantity) {
          var k = this.item;
          k.quantity = this.quantity;
          await this.$store.commit("setCart", k);
        }
      }
    },
  },
};
</script>
<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  font-family: "Poppins", sans-serif;
}
.menu {
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 20px 40px;
}
.heading {
  background-color: #802f59;
  color: #ffffff;
  margin-bottom: 30px;
  padding: 30px 0 30px 0;
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
.food-items {
  display: grid;
  position: relative;
  grid-template-rows: auto 1fr;
  border-radius: 15px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  margin: 0 20px;
}
.food-items img {
  position: relative;
  width: 100%;
  border-radius: 15px 15px 0 0;
}
.details {
  padding: 20px 10px;
  display: grid;
  grid-template-rows: auto 1fr 50px;
  grid-row-gap: 15px;
}
.details-sub {
  display: grid;
  grid-template-columns: auto auto;
}
.details-sub > h5 {
  font-weight: 600;
  font-size: 18px;
}
.price {
  text-align: right;
}
.details > p {
  color: #6f6f6f;
  font-size: 15px;
  line-height: 28px;
  font-weight: 400;
  align-self: stretch;
}
.details > button {
  background-color: #802f59;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  border-radius: 5px;
  width: 180px;
}
</style>
