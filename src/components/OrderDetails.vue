<template>
  <v-col cols="auto">
    <v-dialog transition="dialog-top-transition" width="auto">
      <template v-slot:activator="{ props }">
        <div v-bind="props">{{ item.id }}</div>
      </template>
      <template v-slot:default="{ isActive }">
        <v-card>
          <v-toolbar class="tool1" title="Order Summary">
            <span class="idcolor"> order id:{{ item.id }} </span>
          </v-toolbar>
          <v-card-text>
            <div>
              <!-- <h2>Order Summary</h2> -->
              <table>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Rate</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(i, index) in orderItems" :key="index">
                    <td>{{ i.name }}</td>
                    <td>{{ i.quantity }}</td>
                    <td>{{ i.price }}</td>
                    <td>{{ computeSubPrice(i) }}</td>
                  </tr>
                </tbody>
              </table>
              <div class="total-price">Total Price: {{ totalPrice }}</div>
            </div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn variant="text" @click="isActive.value = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-col>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      orderItems: [],
      selectedOrderId: null,
    };
  },
  computed: {
    totalPrice() {
      return this.orderItems.reduce(
        (total, item) => total + this.computeSubPrice(item),
        0
      );
    },
    getSelectedOrderItems() {
      const selectedOrder = this.orders.find(
        (item) => item.id === this.selectedorderid
      );
      return selectedOrder ? selectedOrder.orderItems : [];
    },
  },
  methods: {
    computeSubPrice(item) {
      // console.log(item);
      return item.quantity * item.price;
    },
  },
  async mounted() {
    try {
      var itemName = Object.keys(this.item.items);
      var quantities = Object.values(this.item.items);
      var price = this.item.prices;
      // console.log(this.item.items)
      for (let i = 0; i < itemName.length; i++) {
        this.orderItems.push({
          name: itemName[i],
          quantity: quantities[i],
          price: price[i],
        });
      }
      // console.log(price);
    } catch (error) {
      console.log("error", error);
    }
  },
};
</script>
<style>
.tool1 {
  background-color: hsl(245, 53%, 47%) !important;
  color: white !important;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
.total-price {
  margin-top: 20px;
  font-weight: bold;
  text-align: center;
}
.idcolor {
  color: white;
  margin-right: 15px;
  font-size: 20px;
}
</style>
