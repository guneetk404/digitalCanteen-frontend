<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <div v-if="cartItems.length === 0">
      <p>Your cart is empty!</p>
    </div>
    <div v-else class="text-content">
      <h2 class="title">Order Summary</h2>
      <p class="subtitle">
        Thanks for choosing argus canteen , see you soon again
      </p>
      <div class="cart-flex">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <div class="plan-box">
            <!-- <div class="plan-box-left"> -->
            <v-icon icon="mdi-food-fork-drink" />
            <!-- <img src="https://unsplash.com/photos/LxD9fZYR2uw" alt=""> -->
            <!-- <div class="item-details"> -->
            <div>
              <h3>{{ item.name }}</h3>
              <p>Price: ₹{{ item.price }}</p>
            </div>
            <div class="quantity-controls">
              <button
                @click="decreaseQuantity(item)"
                :disabled="item.quantity === 1"
              >
                -
              </button>
              <p>{{ item.quantity }}</p>
              <button @click="increaseQuantity(item)">+</button>
            </div>
            <!-- </div> -->
            <button @click="removeItem(item)">Remove</button>
            <!-- </div> -->
          </div>
        </div>
      </div>
      <br />
      <div class="cart-total">
        <h4>Total:₹{{ getTotalPrice() }}</h4>
      </div>
      <a class="proceed-btn" @click="checkout()">Proceed to Payment</a>
    </div>
  </div>
  <!-- for youtube -->
</template>
<script>
// import store from "@/store";
import orderController from "../controller/orderController"

export default {
  data() {
    return {
      cartItems: [
      ],
      total:0
    };
  },
  methods: {
    async removeItem(item) {
      const index = this.cartItems.indexOf(item);
       this.cartItems.splice(index, 1);
      try {
        await this.$store.commit("updateCart", this.cartItems);
        // console.log("do payment", this.cartItems);
      } catch (error) {
        console.log("error", error);
      }
    },
    async decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--;
        try {
        await this.$store.commit("updateCart", this.cartItems);
        // console.log("do payment", this.cartItems);
      } catch (error) {
        console.log("error", error);
      }
      }
    },
    async increaseQuantity(item) {
      // console.log("item ", item);
      // console.log("do payment", this.cartItems);
      item.quantity++;
      try {
       await this.$store.commit("updateCart", this.cartItems);
        // console.log("do payment", this.cartItems);
      } catch (error) {
        console.log("error", error);
      }
      
    },
    getTotalPrice() {
      this.total=this.cartItems
        .reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0)
        .toFixed(2);
        return this.total;
    },
    async checkout(){
      console.log('cart items are', this.cartItems[0].name)
      await orderController.createOrders(this.total,this.cartItems);

    }
  },
  async beforeMount() {
    try {
      this.cartItems = await this.$store.getters.getCart;
      // console.log("before mount", this.cartItems);
    } catch (error) {
      console.log("error", error);
    }
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@500;700;900&display=swap");
* {
  margin-top: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: "Red Hat Display", sans-serif;
  min-height: 100vh;
  background-image: url(https://www.digitshack.com/codepen/mentor1/pattern-background-desktop.svg);
  background-repeat: no-repeat;
  background-size: cover;
  background-color: hsl(225, 100%, 94%);
  position: relative;
  font-size: 16px;
}
.container {
  /* position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); */
  /* max-width: 650px; */
  background: white;
  border-radius: 20px;
  overflow: hidden;
  /* margin-top: 60px; */
}
.text-content {
  padding: 7%;
  text-align: center;
  /* margin-top: 60px; */
}
.title {
  /* margin-top: 25px; */
  color: hsl(223, 47%, 23%);
  font-weight: 900;
  font-size: 32px;
  margin-bottom: 20px;
}
.text-content p.subtitle {
  color: #8a8a8a;
  margin-bottom: 25px;
}
.plan-box {
  margin-top: 10px;
  background-color: hsl(225, 100%, 98%);
  border-radius: 12px;
  display: flex;
  padding: 25px;
  align-items: center;
  justify-content: space-between;
  padding: 25px !important;
}
.plan-box-left {
  display: flex;
  align-items: center;
  text-align: left;
}
.plan-box-left div {
  margin-left: 20px;
}
.plan-box-left div h5 {
  font-weight: 900;
  font-size: 15px;
  color: hsl(223, 47%, 23%);
}
.plan-box-left div p {
  font-size: 14px;
  color: #8a8a8a;
}
.plan-box a {
  font-weight: 900;
  color: hsl(223, 47%, 23%);
  transition: color 0.3s ease;
}
.plan-box a:hover {
  text-decoration: none;
  color: hsl(245, 75%, 52%);
}
a.proceed-btn {
  display: block;
  text-decoration: none;
  color: white;
  background-color: hsl(245, 75%, 52%);
  padding: 20px 0;
  border-radius: 12px;
  margin: 30px 0;
  transition: background-color 0.3s ease;
  width: 228px;
  margin-left: 65px;
  text-align: center;
}
a.proceed-btn:hover {
  background-color: hsl(224, 23%, 55%);
}
a.cancel-btn {
  color: hsl(224, 23%, 55%);
  text-decoration: none;
  font-weight: 900;
  transition: color 0.3s ease;
}
a.cancel-btn:hover {
  color: hsl(223, 47%, 23%);
}
cart .container {
  max-width: 87%;
}
.title {
  font-size: 23px;
}
div.plan-box {
  padding: 12px;
}
.plan-box-left div {
  margin-left: 10px;
}
a.proceed-btn,
a.cancel-btn,
.plan-box a {
  font-size: 13px;
}
.text-content {
  padding: 3% 6%;
}
/* Youtube link */
.link {
  position: fixed;
  background-color: #d12322;
  padding: 23px 40px;
  right: -87px;
  border-radius: 5px;
  top: 50%;
  transform: translateY(-50%);
  transform: rotate(-90deg);
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  text-decoration: none;
  text-transform: capitalize;
  transition: all 0.1s ease-in-out;
}
.link i {
  padding-left: 7px;
}
.link:hover {
  text-decoration: underline;
  background-color: black;
}
.cart {
  padding: 20px;
}
.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 10px;
}
.item-details {
  flex: 1;
}
.cart-total {
  display: flex;
  justify-content: center;
  align-items: center;
}
button {
  padding: 8px 12px;
  background-color: #f0f0f0;
  border: none;
  cursor: pointer;
}
.quantity-controls {
  display: flex;
  align-items: center;
}
.quantity-controls button {
  margin: 0 5px;
}
/* Added styles */
.cart {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cart-item {
  width: 100%;
}
.cart-item .item-details {
  margin-right: 10px;
}
.cart-total {
  width: 100%;
  margin-top: 20px;
}
</style>
