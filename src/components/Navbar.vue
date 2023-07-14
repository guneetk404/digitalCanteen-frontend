<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <v-app-bar  :elevation="5">
      
      
      <v-menu
        transition="scale-transition"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            color="primary"
            v-bind="props"
          >
          <v-icon icon="mdi-menu" />
          </v-btn>
        </template>
  
        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
  
      <template v-slot:append>
     
      <v-menu
      v-model="menu"
      :close-on-content-click="false"
      location="end"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          color="indigo"
          v-bind="props"
        >
        <v-icon @click="accountInfo" icon="mdi-account" />
  
        </v-btn>
      </template>
  
      <v-card min-width="300"  >
        <v-list >
          <v-list-item 
            :title="userName"
            :subtitle=" userEmail "
          >
            <!-- <template v-slot:append>
              <v-btn
                variant="text"
                :class="fav ? 'text-red' : ''"
                icon="mdi-heart"
                @click="fav = !fav"
              ></v-btn>
            </template> -->
          </v-list-item>
        </v-list>
  
        <!-- <v-divider></v-divider> -->
  
        <v-list>
          <!-- <v-list-item>
            <v-switch
              v-model="message"
              color="purple"
              label="Enable messages"
              hide-details
            ></v-switch>
          </v-list-item> -->
  
          <!-- <v-list-item>
            <v-switch
              v-model="hints"
              color="purple"
              label="Enable hints"
              hide-details
            ></v-switch>
          </v-list-item> -->
        </v-list>
  
        <v-card-actions>
          <v-spacer></v-spacer>
  
          <v-btn
            variant="text"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn 
            color="primary"
            variant="text"
            @click= "onLogout"
          >
            Logout
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </template>
      
    </v-app-bar>
  </template>
  
  
  <script>
import router from '@/router';
import store from '@/store';

    export default {
      data: () => ({
        items: [
          { title: 'Profile' },
          { title: 'Menu' },
          { title: 'Orders' },
          { title: 'Cart' },
        ],
        fav: true,
        menu: false,
        message: false,
        hints: true,
        userEmail: null,
        userName: null
        
        
      }),
      methods: {
        async onLogout () {
          this.menu = false;
          router.push('/logout')
          console.log('logged out successfully');


     
        },
        async accountInfo () {
          console.log(store.getters.getToken)
          const res= await fetch('http://localhost:3001/user/verify',{
        method: 'POST',
        headers: {'content-Type': 'application/json',
        'x-access-token' : localStorage.getItem('token')
      },
      
      });
      const data= await res.json();
      // console.log("from navbar",data.body.email);
      const res1= await fetch(`http://localhost:3001/user/${data.body.email}`,{
        method: 'POST',
        headers: {'content-Type': 'application/json',
        'x-access-token' : localStorage.getItem('token')
      },
      
      });
      const data1=await res1.json();

      this.userEmail=data1.body.email
      this.userName=data1.body.name

        
          // console.log("from navbar",this.userName);


     
        }
      },
    }
  </script>