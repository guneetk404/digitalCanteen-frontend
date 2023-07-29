<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :sort-by="[{ key: 'calories', order: 'asc' }]"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Menu items </v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn
              color="#802F59"
              dark
              class="mb-2"
              v-bind="props"
              @click="maxId"
            >
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="5">
                    <v-text-field
                      :rules="Rules"
                      v-model="editedItem.id"
                      label="Item Id"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="5">
                    <v-text-field
                      v-model="editedItem.name"
                      :rules="Rules"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.description"
                      label="Description"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="5">
                    <v-text-field
                      :rules="Rules"
                      v-model="editedItem.price"
                      label="Price"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      v-model="editedItem.availability"
                      :rules="Rules"
                      :items="[0, 1]"
                      label="Availability"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#802F59" variant="text" @click="close">
                Cancel
              </v-btn>
              <v-btn
                color="#802F59"
                variant="text"
                :disabled="isPriceNegative"
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#802F59" variant="text" @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="#802F59" variant="text" @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon size="small" class="me-2" @click="editItem(item.raw)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteItem(item.raw)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="#802F59" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>
<script>
import { VDataTable } from "vuetify/labs/VDataTable";
import itemController from "../controller/itemController";
export default {
  async mounted() {
    // console.log("menu called");
    const res = await fetch(`${import.meta.env.VITE_URL}/admin`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    this.desserts = data.data;
    // console.log(data.data);
    if (this.desserts.length > 0) {
      this.editedItem.id =
        Math.max(...this.desserts.map((dessert) => dessert.id)) + 1;
      console.log("Maximum Item ID:", this.editedItem.id);
    }
    data.data.forEach((desserts) => {
      desserts.availability = desserts.availability ? "yes" : "no";
    });
  },
  components: { "v-data-table": VDataTable },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    maxItemId: 0,
    headers: [
      {
        title: "ID",
        align: "start",
        key: "id",
      },
      { title: "Name", key: "name" },
      { title: "description", key: "description" },
      { title: "price", key: "price" },
      { title: "availability", key: "availability" },
      { title: "Actions", key: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      name: "",
      description: "",
      price: "",
      availability: "",
    },
    defaultItem: {
      id: "",
      name: "",
      description: "",
      price: "",
      availability: "",
    },
    Rules: [
      (v) => !!v || "This field is required",
      (v) => v >= 0 || "This field can't be negative",
    ],
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    isPriceNegative() {
      return (
        this.editedItem.price !== null && parseFloat(this.editedItem.price) < 0
      );
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.desserts = [];
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      console.log(item.id, item.name);
      this.dialog = true;
    },
    maxId() {
      if (this.desserts.length > 0) {
        this.editedItem.id =
          Math.max(...this.desserts.map((dessert) => dessert.id)) + 1;
        console.log("Maximum Item ID:", this.editedItem.id);
      }
    },
    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    async deleteItemConfirm() {
      const res = await itemController.deleteItem(this.editedItem);
      if (res) this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    async save() {
      if (this.editedIndex > -1) {
        const res = await itemController.updateItem(this.editedItem);
        if (res)
          Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        const res = await itemController.addItem(this.editedItem);
        if (res) this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
