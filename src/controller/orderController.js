/* eslint-disable no-undef */
import router from "@/router";
import store from "@/store";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const userOrders = async () => {
  if (await store.getters.getToken) {
    // console.log("mounted in orders page");
    const res = await fetch(`http://localhost:3001/orders`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    return data;
  } else {
    toast.info('Kindly log in',{autoclose:1000})

    // console.log("pls login");
    router.push("/login");
  }
};

const createOrders = async (totalPrice, cartItems) => {
  const d = { totalPrice, cartItems };
  if (await store.getters.getToken) {
    console.log(d);
    const res = await fetch(`http://localhost:3001/orders/payment`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(d),
    });
    var data = await res.json();
    if (data.success) {
      var options = {
        key: data.keyId,
        amount: data.amount,
        currency: "INR",
        name: "Satyam",
        description: "nothing",
        image: "https://dummyimage.com/600x400/000/fff",
        order_id: data.orderId,
        handler: async function () {
          console.log("Payment Succeeded");
          store.commit('clearCart');
          const res = await fetch(`http://localhost:3001/orders/insert`, {
            method: "POST",
            headers: {
              "content-Type": "application/json",
              "x-access-token": localStorage.getItem("token"),
            },
            body: JSON.stringify(d),
          });
          const data = await res.json();
        if(data.success){
          toast.success(`${data.message}`,{ autoclose:1000})

          router.push('/user/orders')
        }else{
          toast.error(`${data.message}`,{ autoclose:2000})

          console.log(data.error);
        }
         
          
          return data?.success;
        },
        // "prefill": {
        //   "contact":""+res.contact+"",
        //   "name": ""+res.name+"",
        //   "email": ""+res.email+""
        // },
        notes: {
          description: "ahvvsjwv",
        },
        theme: {
          color: "#2300a3",
        },
      };
      const r = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!r) {
        console.log("RAzorpay SDK failed to load");
        return false;
      }
      var razorpayObject = new Razorpay(options);
      razorpayObject.on("payment.failed", function () {
        toast.error("Payment failed", { autoclose: 2000 });

        console.log("Payment Failed");
        router.push("/user/cart");
      });
      razorpayObject.open();
    } else {
      toast.error('cannot open payment page now',{ autoclose:2000})

      // alert(res.msg);
    }
    console.log(data.message);
    return data?.success;
  } else {
    // toast.no('Removed',{ autoclose:1000})
    toast.info('Kindly log in',{autoclose:2000})

    // console.log("pls login");
    router.push("/login");
  }
};

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export default { userOrders, createOrders };
