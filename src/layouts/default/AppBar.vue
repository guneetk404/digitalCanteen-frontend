<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-app-bar :elevation="5">
    
    
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
      <v-icon icon="mdi-account" />

      </v-btn>
    </template>

    <v-card min-width="300">
      <v-list>
        <v-list-item
          title="Guneet Singh"
          subtitle="guneetk404@gmail.com"
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
          @click="menu = false"
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
    }),
  }
</script>