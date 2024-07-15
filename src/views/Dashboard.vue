<template>
  <div>
    <v-container v-if="category.length > 0">
      <div>
        <template v-for="(item,key) in category" :key="key">
            <div class="d-flex mt-10 mb-5">
               <span class="text-overline">{{item}}</span>
               <v-spacer/>
               <span class="text-overline text-red" style="cursor: pointer">See More</span>
            </div>
            <v-row>
            <template v-for="item in productList.filter(f => f.category == item)" :key="item.ID">
                <v-col lg="3" xl="3" md="3" sm="6">
                  <v-card class="ma-2" height="250" variant="flat" @click="gotoDetails(item)">
                    <v-img
                        max-height="170"
                        :src="item.image"
                        class="rounded-0 rounded-t-lg mt-2">
                    </v-img>
                    <v-card-text class="pb-0 mb-0">
                      <span
                        class="d-block text-truncate"
                        style="max-width: 220px;"
                      >
                        {{item.title}}
                      </span>
                      <span class="d-flex py-2 mx-0">
                        <v-icon size="small">mdi-currency-php</v-icon>
                        &nbsp;
                        <span>{{item.price}}</span>
                        <v-spacer></v-spacer>
                        <v-rating
                        :model-value="item.rating.rate"
                        color="yellow-darken-3"
                        size="x-small"
                        density="compact"
                        readonly
                      ></v-rating>
                      </span>
                    </v-card-text>
                  </v-card>
                </v-col>
              </template>
          </v-row>
        </template>
      </div>
    </v-container>
    <v-container class="text-center" v-else>
      <div class="mt-10" v-if="$route.query.keyword != undefined">
        <span class="text-h5 text-red">No search result found.</span>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent } from "vue";
import { useProduct } from '@/store/product'
import { storeToRefs } from 'pinia'

export default defineComponent({
  setup(){
    const product = useProduct();
    const { category, productList } = storeToRefs(product)
    const { fetchProduct } = product
    
    return {category, productList,fetchProduct }
  },
  methods: {
    async gotoDetails(item: any){
      this.$router.push({path: `/product/detail/${item.id}`})
    }
  },  
  watch: {
    "$route.query": {
      handler: async function(e){
        if(e != undefined){
          await this.fetchProduct(e);
        }else{
          await this.fetchProduct();
        }
      },
      deep: true,
      immediate: true
    }
  }
})
</script>
