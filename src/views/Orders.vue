<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/valid-v-slot -->
<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <h2 class="hi">All orders</h2>
  <v-card>
    <v-card-title>
      Search For your Favourite Orders
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :header-props="{ class: 'custom-header' }"
      :items="orders"
      :search="search"
      @click:row="showOrderDetails"
    >
      <template v-slot:item.id="{ item }">
        <order-details :item="item.raw"></order-details>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import { VDataTable } from "vuetify/labs/VDataTable";
import OrderDetails from "../components/OrderDetails.vue";
import orderController from "../controller/orderController";
export default {
  orderid: "app-user",
  components: {
    "v-data-table": VDataTable,
    "order-details": OrderDetails,
  },
  data() {
    return {
      search: "",
      headers: [
        {
          align: "start",
          key: "id",
          title: "Order ID ",
        },
        { title: "Order Date", align: "", key: "date" },
        { title: "Total Amount", align: "", key: "totalprice" },
        { title: "Timing", align: "", key: "time" },
      ],
      orders: [],
      selectedOrder: null,
      dialogVisible: false,
    };
  },
  methods: {
    showOrderDetails() {
      console.log("I m clciked");
      this.dialogVisible = true;
    },
  },
  async mounted() {
    try {
      // console.log("pp")
      const data = await orderController.userOrders();
      if (data?.success) {
        // console.log(data.data)
        this.orders = data.data;
        data.data.forEach((order) => {
          const timestamp = new Date(Number(order.id));
          var year = timestamp.getFullYear();
          var mes = timestamp.getMonth() + 1;
          var dia = timestamp.getDate();
          var fecha = dia + "-" + mes + "-" + year;
          order.date = fecha;
          // console.log(order.date)
          // var time = new Date(timestamp * 1000).toTimeString()
          var time = new Date(timestamp * 1000).toLocaleTimeString();

          if (time.split(":") < "12") {
            time = "Morning";
          } else if (time.split(":" < 3)) {
            time = "Noon";
          } else {
            time = "Evening";
          }
          order.time = time;
        });

        return;
      }
      console.log("problem in fetching orders");
    } catch (error) {
      console.log("error", error);
    }
  },
};
</script>
<style>
.custom-header {
  background-color: black !important;
}
.v-data-table-header__content {
  color: rgb(8, 8, 8) !important;
}
.hi {
  background-color: hsl(245, 53%, 47%);
  color: #ffffff;
  padding: 38px 0px 26px 0;
  grid-column: 1/-1;
  text-align: center;
  font-weight: 600;
  font-size: 30px;
  letter-spacing: 5px;
}
</style>
