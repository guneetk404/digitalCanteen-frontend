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
      :items="desserts"
      :search="search"
      @click:row="showOrderDetails"
    >
      <template v-slot:item.orderid="{ item }">
        <order-details :item="item.raw"></order-details>
      </template>
    </v-data-table>
  </v-card>
  <div v-if="dialogVisible">
    <test-com></test-com>
  </div>
</template>
<script>
import { VDataTable } from "vuetify/labs/VDataTable";
import OrderDetails from "../components/OrderDetails.vue";
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
          key: "orderid",
          title: "Order ID ",
        },
        { title: "Order Date", align: "", key: "odate" },
        { title: "Total Amount", align: "", key: "ototal" },
        { title: "Timing", align: "", key: "timing" },
      ],
      desserts: [
        {
          orderid: 128,
          odate: "22-7-2023",
          ototal: 2451,
          timing: "Evening",
          actions: "click",
        },
        {
          orderid: 132,
          odate: "22-7-2023",
          ototal: 1245,
          timing: "Morning",
          actions: "click",
        },
        {
          orderid: 123,
          odate: "22-7-2023",
          ototal: 2415,
          timing: "Afternoon",
          actions: "click",
        },
        {
          orderid: 1237,
          odate: "22-7-2023",
          ototal: 24445,
          timing: "Evening",
          actions: "click",
        },
        {
          orderid: 1236,
          odate: "22-7-2023",
          ototal: 2411145,
          timing: "Afternoon",
          actions: "click",
        },
        {
          orderid: 1246,
          odate: "12-7-2023",
          ototal: 24115,
          timing: "Morning",
          actions: "click",
        },
        {
          orderid: 1216,
          odate: "21-7-2023",
          ototal: 24145,
          timing: "Morning",
          actions: "click",
        },
        {
          orderid: 116,
          odate: "2-7-2023",
          ototal: 345,
          timing: "Morning",
          actions: "click",
        },
      ],
      selectedOrder: null,
      dialogVisible: false,
    };
  },
  methods: {
    showOrderDetails() {
      this.dialogVisible = true;
    },
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
