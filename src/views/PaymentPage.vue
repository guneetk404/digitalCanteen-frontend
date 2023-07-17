<template>
  <div class="container">
    <div class="hero">
      <!-- <img src="https://unsplash.com/photos/LxD9fZYR2uw" alt=""> -->
    </div>
    <div class="text-content">
      <h2 class="title">Order Summary</h2>
      <p class="subtitle">
        Thanks for choosing argus canteen , see you soon again
      </p>
      <div class="plan-box">
        <div class="plan-box-left">
          <v-icon icon="mdi-food-fork-drink" />
          <!-- <img src="https://unsplash.com/photos/LxD9fZYR2uw" alt=""> -->
          <div>
            <h5>sandwich</h5>
            <p>price:35* quantity:2</p>
          </div>
        </div>
        <p>70</p>
      </div>
      <div class="plan-box">
        <div class="plan-box-left">
          <v-icon icon="mdi-food-fork-drink" />
          <!-- <img src="https://www.digitshack.com/codepen/mentor1/icon-music.svg" alt=""> -->
          <div>
            <h5>Masala Maggie</h5>
            <p>price:45* quantity:2</p>
          </div>
        </div>
        <p>90</p>
      </div>
      <div class="plan-box">
        <div class="plan-box-left">
          <v-icon icon="mdi-food-fork-drink" />
          <!-- <img src="https://www.digitshack.com/codepen/mentor1/icon-music.svg" alt=""> -->
          <div>
            <h5>cheese sandwich</h5>
            <p>price:45* quantity:2</p>
          </div>
        </div>
        <p>90</p>
      </div>
      <br />
      <h3>total amount:250</h3>
      <a href="#" class="proceed-btn">Proceed to Payment</a>
      <a href="#" class="cancel-btn">Cancel Order</a>
    </div>
  </div>
  <!-- for youtube -->
</template>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@500;700;900&display=swap");
* {
  margin: 0;
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
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 450px;
  background: white;
  border-radius: 20px;
  overflow: hidden;
}
.text-content {
  padding: 7%;
  text-align: center;
}
.title {
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
@media only screen and (max-width: 425px) {
  body {
    background-image: url(https://www.digitshack.com/codepen/mentor1/pattern-background-mobile.svg);
    font-size: 14px;
  }
  .container {
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
    padding: 9% 7%;
  }
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
</style>
