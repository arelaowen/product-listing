<template>
  <div>
    <v-toolbar color="primary" :extended="isSearchEnabled">
      <v-toolbar-title>
        <span class="font-weight-bold text-h4" @click="$router.push({path: '/'})" style="cursor: pointer">Shop Lyft</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

        <template v-if="cartList.length > 0">
          <v-badge color="error" offset-x="12"
            :content="cartList.length">
            <v-icon icon="mdi-cart" class="mr-4"></v-icon>
          </v-badge>
        </template>

        <template v-else>
          <v-icon icon="mdi-cart" class="mr-4"></v-icon>
        </template>
        
        <template v-if="!isAuthenticated">
          <v-btn size="small">  
            <v-icon class="mr-1">mdi-account-plus</v-icon>
            Sign Up
          </v-btn>
          <v-btn size="small" @click="openLoginForm()">
            <v-icon class="mr-1">mdi-account</v-icon>
            Login
          </v-btn>
        </template>

        <v-menu v-if="isAuthenticated">
          <template v-slot:activator="{ props }">
              <v-icon size="small" class="mr-3 ml-2"  v-bind="props">mdi-cog</v-icon>
          </template>
          <v-list density="compact">
            <v-list-item link to="/maintenance/product">
              <v-list-item-title>
                Product Maintenance
              </v-list-item-title>
            </v-list-item>
            <v-divider/>
            <v-list-item link to="/maintenance/user">
              <v-list-item-title>
                User Maintenance
              </v-list-item-title>
            </v-list-item>
            <v-divider/>
            <v-list-item @click="logout" style="cursor: pointer">
              <v-list-item-title>
                Logout
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
    </v-toolbar>
    <v-card
      variant="flat"
      class="mx-auto"
      max-width="70%"
      style="margin-top: -64px;"
      v-if="isSearchEnabled"
    >
      <v-toolbar color="primary">
        <v-text-field
        v-model="search"
        append-inner-icon="mdi-magnify"
        rounded="pill"
        variant="outlined"
        density="compact"
        hide-details
        placeholder="Search what you are looking for"
        class="mx-1"
        @keypress="procSearch"
        ></v-text-field>
        <v-btn :ripple="false" icon>
          <v-icon>mdi-filter</v-icon>
        </v-btn>
        <v-btn icon @click="sort()">
          <v-icon>{{sortDesc == "asc" ? "mdi-sort-descending" : "mdi-sort-ascending"}}</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
  </div>
  <Login :status="loginStatus" @close="loginStatus = false" />
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent, ref } from "vue";

import { useCart } from '@/store/cart'
import { storeToRefs } from 'pinia'

export default defineComponent({
    setup(){
      const search = ref("")
      const sortDesc = ref("asc")
      const loginStatus = ref(false)

      const cart = useCart();
      const { cartList } = storeToRefs(cart)

      
      return { search, sortDesc, loginStatus, cartList }
    },
    computed: {
      isSearchEnabled(){
          return this.$route.meta.searchEnabled == undefined ? false : this.$route.meta.searchEnabled
      },
      isAuthenticated(){
        return this.$storage.getStorageSync("authKey") == undefined ? false : true
      }
    },
    methods: {
      async sort(){
        this.sortDesc = this.sortDesc == "asc" ? "desc" : "asc"
        this.$router.push({path: "/", query: {
            keyword: this.search,
            sort: this.sortDesc
          } 
        })
      },
      async procSearch(e : any){
        if(e.charCode == 13){
          if(e.target._value){
              this.$router.push({path: "/", query: {
                keyword: e.target._value,
                sort: this.sortDesc
              }
            })
          }else{
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            this.$router.push({path: "/"}).catch(() => {})
          }
        }
      },
      openLoginForm(){
        this.loginStatus = true;
      },
      logout(this: any){
        this.$storage.clearStorageSync();
        this.$router.go(0)
      }
    },
    watch: {
      search: {
        handler(e){
          if(!e){
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            this.$router.push({path: "/"}).catch(() => {})
          } 
        },
        immediate: true
      },
    }
})

</script>