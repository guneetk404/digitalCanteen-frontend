<!-- eslint-disable no-unused-labels -->
<template>
    <div  v-for="item in items" :key="item" class="d-flex align-center flex-column">
        
            <v-col cols="10">
        <v-card id="card">
            <v-card-title>
              <div>
                <h3>{{ item.name }}</h3>
                <span>{{ item.price }}</span>
              </div>
              <v-btn variant="outlined">
                Button
              </v-btn>
            </v-card-title>
            <v-card-text>
              <!-- Card content goes here -->
            </v-card-text>
          </v-card>
        </v-col>
    
     
</div>
   
  </template>
  






<script>

  export default{
    data(){
        return {
        items:[
            {'name':'sandwich','price':25},
            {'name':'maggiee','price':25},
            {'name':'sandwich','price':25},
            {'name':'sandwich','price':25},
            {'name':'sandwich','price':25},
            {'name':'sandwich','price':25},
            {'name':'sandwich','price':25},
            {'name':'sandwich','price':25},
        ]
        }
    }
  }


</script>




  <style>
   .top{
    text-align: center;
   }

   #card{
    margin-top: 10px;
    border: 2px solid rgb(197, 192, 192);
   }
  </style>