/* eslint-disable no-undef */
import store from "@/store";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const addItem = async (item) => {
  if ((await store.getters.getToken) && (await store.getters.getAdmin)) {
    // console.log("mounted in orders page");
    const res = await fetch(`${import.meta.env.VITE_URL}/admin/insert`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(item),
    });
    const data = await res.json();
    // console.log(data.items)
    return data;
  } else {
    toast.info("Kindly log in/ not admin", { autoclose: 2000 });
  }
};

const deleteItem = async (item) => {
  if ((await store.getters.getToken) && (await store.getters.getAdmin)) {
    // console.log("mounted in orders page");
    const res = await fetch(`${import.meta.env.VITE_URL}/admin/delete`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(item),
    });
    const data = await res.json();
    // console.log(data.items)
    return data;
  } else {
    toast.info("Kindly log in/ not admin", { autoclose: 2000 });
  }
};
const updateItem = async (item) => {
  if ((await store.getters.getToken) && (await store.getters.getAdmin)) {
    // console.log("mounted in orders page");
    const res = await fetch(`${import.meta.env.VITE_URL}/admin/update`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(item),
    });
    const data = await res.json();
    // console.log(data.items)
    return data;
  } else {
    toast.info("Kindly log in/ Not admin", { autoclose: 2000 });
  }
};

export default { addItem, deleteItem, updateItem };
