<template>
  <v-col cols="auto">
    <v-dialog transition="dialog-top-transition" width="auto">
      <template v-slot:activator="{ props }">
        <div v-bind="props">{{ item.orderid }}</div>
      </template>
      <template v-slot:default="{ isActive }">
        <v-card>
          <v-toolbar class="tool1" title="Order Summary">
            <span class="idcolor"> order id:{{ item.orderid }} </span>
          </v-toolbar>
          <v-card-text>
            <div>
              <!-- <h2>Order Summary</h2> -->
              <table>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Sub Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in orderItems" :key="index">
                    <td>{{ item.name }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ item.price }}</td>
                    <td>{{ computeSubPrice(item) }}</td>
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
      orderItems: [
        { name: "veg maggie", quantity: 2, price: 30 },
        { name: "sandwich", quantity: 5, price: 20 },
        { name: "thali", quantity: 5, price: 35 },
      ],
      orders: [
        {
          orderid: 128,
          orderItems: [
            { name: "veg maggie", quantity: 2, price: 30 },
            { name: "sandwich", quantity: 5, price: 20 },
            { name: "thali", quantity: 5, price: 35 },
          ],
        },
        {
          orderid: 122,
          orderItems: [
            { name: "veg maggie", quantity: 2, price: 30 },
            { name: "sandwich", quantity: 5, price: 20 },
            { name: "thali", quantity: 5, price: 35 },
          ],
        },
      ],
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
        (item) => item.orderid === this.selectedorderid
      );
      return selectedOrder ? selectedOrder.orderItems : [];
    },
  },
  methods: {
    computeSubPrice(item) {
      return item.quantity * item.price;
    },
  },
};
</script>
<style>
.tool1 {
  background-color: hsl(245, 53%, 47%);
  color: white;
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
